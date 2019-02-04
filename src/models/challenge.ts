import { SessionService } from "../services/session";
import DIContainer from "../utils/dicontainer";
import { Modules } from "../services";

export type ChallengeType = {
  type: string;
  duration: number;
  score: { [id: string]: number };
  context_id: string;
  end_ts: number;
  version?:number;
};

export class Challenge {
  private _session: SessionService;
  private _currentPlayer: string = "";

  private _originalScore: number = 0;

  private _data: ChallengeType = {
    type: "challenge",
    score: {},
    duration: 60 * 60 * 24 * 7, // default = 60 * 60 * 24 * 7 = 1week
    context_id: "",
    end_ts: -1,
    version: 1
  };

  constructor(container: DIContainer, current_player_id: string) {
    this._session = container.get(Modules.SESSION);
    this._currentPlayer = current_player_id;
  }

  public parse(data: any): Challenge | undefined {
    if (data == null) return undefined;

    let { end_ts, context_id } = data;
    if (context_id == null) return undefined;

    let scores = "score" in data ? data["score"] : {};
    this._data.context_id = context_id || "";
    this._data.score = scores;
    this._data.end_ts = end_ts || -1;

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
  /**
   * Returns the score for the current player
   */
  getPlayerScore() {
    return this.getScore(this._currentPlayer);
  }

  /**
   * Returns true if the current player has a score set
   */
  playerHasScore(){
    return this.hasScore(this._currentPlayer);
  }

  /**
   * Returns the player id of the opponent
   * Should only be used in challenges between two players
   */
  getOpponentId(): string | undefined {
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
   * Returns the context id the challenge refers to.
   */
  get contextId(): string {
    return this._data.context_id;
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
  save() {
    let type = this._data.type;
    let duration = this._data.duration;
    /*if (this._data.end_ts == undefined){
      this._data.end_ts = Math.floor(new Date().getTime() / 1000) + duration;
    }*/
    let score = this.getPlayerScore();
    if (score == null) {
      console.error("The score for current player hasn't been set.");
      return false;
    }
    
    if (isFinite(this._originalScore)){
      score -= this._originalScore;
    }

    this._session.setData({ type, duration, score });
    return true;
  }

  toJSON() {
    return JSON.stringify(this._data);
  }
}
