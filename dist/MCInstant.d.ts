/// <reference types="node" />
import { LogLevel } from "./logger";
import { PublicWallet } from "./services/wallet";
import { ChallengeService } from "./services/challenges";
import { CurrencyAmount } from "./services/currencies";
export declare class MCInstant {
    private static loggerName;
    private di;
    private logger;
    wallet: PublicWallet;
    challenges: ChallengeService;
    constructor({ endpoint, logLevel, app_id, challenge_reward }?: MCInstantOptions);
    readonly events: import("events").EventEmitter;
}
export interface MCInstantOptions {
    endpoint?: string;
    logger?: any;
    logLevel?: LogLevel;
    app_id?: number;
    challenge_reward?: CurrencyAmount;
}
