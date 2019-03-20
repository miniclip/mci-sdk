
import { WalletService } from "./wallet";
import { Modules } from ".";
import { INetworkManager } from "../core/network";
import { Challenge } from "../models";
import { IDataStore } from "../store";
import { BaseService } from "../core/services";
import { EVENT_CHALLENGE_ENDED } from "../events";
import { CurrencyAmount } from "./currencies";
import { ChallengeType } from "src/models/challenge";

type CreatePayload = {
  score?: number;
  duration?: number;
};

export type ChallengeEndedPayload = {
  challenge: ChallengeType;
  won: boolean;
  reward: CurrencyAmount
}

export class ChallengeService extends BaseService{
  private wallet: WalletService;
  private network: INetworkManager;
  private store: IDataStore;

  private challenges: Challenge[] = [];
  private initialized: boolean = false;
  public readonly initialFetch: Promise<void>;
  private initialFetchResolver:Function = <any>null;

  constructor(){
    super();

    this.initialFetch = new Promise((resolve) => {
      this.initialFetchResolver = resolve;
    })
  }

  public _boot(){
    this.wallet = this.container.get(Modules.WALLET);
    this.network = this.container.get(Modules.NETWORK);
    this.store = this.container.get(Modules.GLOBAL_STORE);
  }

  public async updateList(): Promise<Challenge[]> {
    const playerId = FBInstant.player.getID();
    const url = "/players/" + playerId + "/challenges";

    //console.log("current balance = ", await this.wallet.getBalance());

    try {
      const result = await this.network.get(url);
    
      if (!Array.isArray(result.data)) return [];
      
      let challenges:any[] = <any>result.data;
      for (let i = 0; i < challenges.length; i++) {
        let challenge = new Challenge(this.container, playerId).parse(
          challenges[i]
        );

        const consumed = await this.consumeChallenge(challenge);
        if (consumed) challenge = undefined;
        
        challenges[i] = challenge;
      }

      challenges = challenges.filter((e: any) => e != undefined);

      this.challenges = challenges.length > 0 ? challenges : [];
    } catch (error) {
      console.error("Failed to fetch challenges", error);
      this.challenges = [];
    }

    this.initialized = true;
    return this.challenges;
  }

  /**
   * Returns all available challenges
   */
  public async getAll(): Promise<Challenge[]> {
    return new Promise((resolve) => {
      if (!this.initialized) {
        this.updateList().then((list:Challenge[])=>{
          resolve(list);
        })
        return;
      }
      resolve(this.challenges)
    })
  }

  /**
   * Get a challenge by context id.
   * @param context_id
   */
  public async getByContext(
    context_id: string
  ): Promise<Challenge | undefined> {
    let challenges = await this.getAll();

    return challenges.find(c => c.contextId == context_id);
  }

  public async getFromToken(token:string):Promise<Challenge|undefined> {
    return new Promise(async (resolve)=>{
      let challenge = this.create();
      if (!challenge.loadShareToken(token)){
        resolve(undefined);
      }

      let previous = await this.getByContext(challenge.contextId);

      resolve(previous || challenge);
    });
  }
  
  /**
   * Create a new challenge for the current context.
   * The challenge state is only saved on context quit
   * @param payload
   */
  public create({
    score = 0,
    duration = 60 * 60 * 24 * 7
  }: CreatePayload = {}): Challenge {
    let playerID = FBInstant.player.getID();
    let challenge = new Challenge(this.container, playerID);

    challenge
      .setDuration(duration)
      .setScore(score)
      .setContext(FBInstant.context.getID());

    return challenge;
  }

  private hasPlayerWon(challenge:Challenge){
    let players = challenge.playerIds;
    
    let scores = [];
    scores = players.map((p) => { return { id: p, 'score': challenge.getScore(p) }})
                    .sort((a:any, b:any) => {
                      if (isFinite(a.score-b.score)){
                        return b.score - a.score;
                      } else {
                        return (isFinite(a.score)) ? -1:1
                      }
                    });

    if (scores[0].id == challenge.getPlayerId()){
      return true;
    }

    return false;
  }

  private async consumeChallenge(challenge: Challenge | undefined):Promise<boolean> {
    if (!challenge || challenge.time_left > 0 || challenge.time_left == -1) return false;

    // make request
    const playerId = FBInstant.player.getID();
    const challengeId = challenge.challengeId;
    const url = "/players/" + playerId + "/challenges/" + challengeId;

    try {
      const response = await this.network.delete(url);
      const status = response.status;
      if (status < 200 || status > 299) return true;
      //console.log("--Consumed challenge", response);

      // add to wallet
      let reward:CurrencyAmount = this.store.get("challenge_reward",  null);
      
      const winner = this.hasPlayerWon(challenge);
      if (reward != null && winner){
        this.wallet.addBalance(reward.value, reward.currency);
      }

      let payload: ChallengeEndedPayload = { challenge: challenge.data, won: winner, reward };
      this.events.emit(EVENT_CHALLENGE_ENDED, payload);

      return true;
    } catch (error) {
      console.error("Failed to consume: ", error);
    }

    return false;
  }
}
