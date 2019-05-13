import { SessionService } from "../services/session";
import DIContainer from "../utils/dicontainer";
import { Modules } from "../services";
import { INetworkManager } from "../core/network";
import MCContext from "../core/context";

export type ChallengeType = {
  type: string;
  duration: number;
  score: { [id: string]: number };
  challenge_id?: string;
  context_id: string;
  end_ts: number;
  updated_ts: number;
  version?:number;
  player_id?:string;
  other_player_id?:string
};

export class Challenge {
  private _session: SessionService;
  private _network: INetworkManager;
  private _currentPlayer: string = "";

  private _originalScore: number = 0;

  private _data: ChallengeType = {
    type: "challenge",
    score: {},
    duration: 60 * 60 * 24 * 7, // default = 60 * 60 * 24 * 7 = 1week
    context_id: "",
    end_ts: -1,
    updated_ts: -1,
    version: 1
  };

  constructor(container: DIContainer, current_player_id: string) {
    this._session = container.get(Modules.SESSION);
    this._network = container.get(Modules.NETWORK);
    this._currentPlayer = current_player_id;
  }

  public parse(data: any): Challenge | undefined {
    if (data == null) return undefined;

    let { end_ts, updated_ts, context_id, challenge_id, other_player_id, player_id } = data;
    if (context_id == null) return undefined;

    
    let scores = "score" in data ? data["score"] : {};
    this._data.context_id = context_id || "";
    this._data.score = scores;
    this._data.end_ts = end_ts || -1;
    this._data.updated_ts = updated_ts || -1;
    this._data.challenge_id = challenge_id;
    this._data.other_player_id = other_player_id;
    this._data.player_id = player_id;
    
    this._originalScore = this.getPlayerScore();

    return this;
  }

  setScore(score: number) {
    if (this._currentPlayer == null) {
      console.error("Challenge current player hasn't been set");
      return this;
    }

    let player_id = this._currentPlayer;
    this._data.score[player_id] = score;

    return this;
  }

  setDuration(duration: number) {
    this._data.duration = duration;
    return this;
  }

  setContext(context_id: string) {
    this.data.context_id = context_id;
    return this;
  }

  setChallengeId(challenge_id: string){
    this._data.challenge_id = challenge_id;
    return this;
  }

  hasScore(player_id: string | undefined) {
    if (player_id == undefined) return false;
    
    if (this._data.score && player_id in this._data.score) {
      return true;
    }
    return false;
  }

  /**
   * Get Challenge score for a player id.
   */
  getScore(player_id: string | undefined):number {
    if (player_id == undefined) return NaN;
    if (!this.hasScore(player_id)) return NaN;

    
    return this._data.score[player_id];
  }

  getPlayerId() {
    return this._currentPlayer;
  }

  getChallengerId(){
    return this._data.player_id;
  }

  /**
   * Returns the score for the current player
   */
  getPlayerScore() {
    return this.getScore(this.getPlayerId());
  }

  /**
   * Returns true if the current player has a score set
   */
  playerHasScore(){
    return this.hasScore(this.getPlayerId());
  }

  /**
   * Returns the player id of the opponent
   * Should only be used in challenges between two players
   */
  getOpponentId(): string | undefined {
    if (this._data.other_player_id && this._data.other_player_id != this._currentPlayer) return this._data.other_player_id;
    if (this._data.player_id && this._data.player_id != this._currentPlayer) return this._data.player_id;
    
    const keys = Object.keys(this._data.score);
    return keys.find(id => id != this._currentPlayer);
  }

  /**
   * Returns the score
   */
  getOpponentScore() {
    return this.getScore(this.getOpponentId());
  }

  /**
   * Returns true if the second player has a score set
   */
  opponentHasScore() {
    return this.hasScore(this.getOpponentId());
  }

  /**
   * Returns the ids of player in the challenge (your included)
   */
  get playerIds() {
    return Object.keys(this._data.score);
  }

  /**
   * Returns the challenge duration in seconds
   */
  get duration(): number {
    return this._data.duration;
  }

  /**
   * Returns the time left in the challenge
   */
  get time_left(): number {
    if (!isFinite(this._data.end_ts) || this._data.end_ts < 0) {
      return -1;
    }

    let now = Math.floor(new Date().getTime() / 1000);
    return Math.max(0, this._data.end_ts - now);
  }

  get expired() {
    return this.time_left == 0
  }

  /**
   * Timestamp of when this challenge data was updated
   */
  get updated_at(){
    return this._data.updated_ts;
  }
  /**
   * Returns the context id the challenge refers to.
   */
  get contextId(): string {
    return this._data.context_id;
  }

  get challengeId(): string|undefined {
    return this._data.challenge_id;
  }

  get data() {
    return this._data;
  }

  getShareToken(){
    let token = JSON.stringify(this.data);
    return token;
  }

  loadShareToken(token:string|any){
    try {
      if (typeof(token) === "string"){
        let tmp = JSON.parse(token);
        this._data = tmp;

      } else if (typeof(token) === "object"){
        this._data = token;
      }
    } catch(err){
      return false;
    }
    return true;
  }

  /**
   *  Saves the challenge information in current session data
   *  The challenge is only commit on context switching or leaving the application.
   */
  async save() {
    let type = this._data.type;
    let duration = this._data.duration;
    let context_id = this.contextId;
    let timezone_offset = new Date().getTimezoneOffset();
    
    let score = this.getPlayerScore();
    if (score == null) {
      console.error("The score for current player hasn't been set.");
      return false;
    }
    
    if (isFinite(this._originalScore)){
      score -= this._originalScore;
    }

    const playerId = this.getPlayerId();
    var challengeData = { context_id, score, duration, timezone_offset};

    try {
      var result:any;
      if (!this.challengeId){ // create

        var otherPlayers = await MCContext.getOtherPlayers();
        if (otherPlayers.length == 1){
          challengeData['other_player_id'] = otherPlayers[0].id;
        }
        
        result = await this._network.post(`/players/${playerId}/challenges`, challengeData);
      } else {
        // update
        result = await this._network.put(`/players/${playerId}/challenges/${this.challengeId}`, challengeData);
      }

      this.parse(result.data);

      this._session.setData({ 
        type, duration, score, 
        challengeId: this.challengeId,
      });
      
    } catch (err){
      return false;
    }

    return true;
  }

  async delete(){
    // make request
    const playerId = this.getPlayerId();
    const challengeId = this.challengeId;
    const url = "/players/" + playerId + "/challenges/" + challengeId;

    try {
      const response = await this._network.delete(url);
      const status = response.status;
      if (status >= 200 && status <= 299) return true;
    } catch(err){
    }
    return false;

  }

  toJSON() {
    return JSON.stringify(this._data);
  }
}
