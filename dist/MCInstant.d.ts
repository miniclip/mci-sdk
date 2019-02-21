/// <reference types="node" />
import { LogLevel } from "./logger";
import { PublicWallet } from "./services/wallet";
import DIContainer from "./utils/dicontainer";
import { ChallengeService } from "./services/challenges";
import { CurrencyAmount } from "./services/currencies";
export declare class MCInstant {
    private static loggerName;
    di: DIContainer;
    private logger;
    wallet: PublicWallet;
    challenges: ChallengeService;
    constructor({ endpoint, logLevel, app_id, challenge_reward, currencies }?: MCInstantOptions);
    readonly events: import("events").EventEmitter;
}
export interface MCInstantOptions {
    endpoint?: string;
    logger?: any;
    logLevel?: LogLevel;
    app_id?: number;
    challenge_reward?: CurrencyAmount;
    currencies?: string[];
}
