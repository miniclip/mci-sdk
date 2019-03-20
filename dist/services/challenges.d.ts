import { Challenge } from "../models";
import { BaseService } from "../core/services";
import { CurrencyAmount } from "./currencies";
import { ChallengeType } from "src/models/challenge";
declare type CreatePayload = {
    score?: number;
    duration?: number;
};
export declare type ChallengeEndedPayload = {
    challenge: ChallengeType;
    won: boolean;
    reward: CurrencyAmount;
};
export declare class ChallengeService extends BaseService {
    private wallet;
    private network;
    private store;
    private challenges;
    private initialized;
    readonly initialFetch: Promise<void>;
    private initialFetchResolver;
    constructor();
    _boot(): void;
    updateList(): Promise<Challenge[]>;
    getAll(): Promise<Challenge[]>;
    getByContext(context_id: string): Promise<Challenge | undefined>;
    getFromToken(token: string): Promise<Challenge | undefined>;
    create({ score, duration }?: CreatePayload): Challenge;
    private hasPlayerWon;
    private consumeChallenge;
}
export {};
