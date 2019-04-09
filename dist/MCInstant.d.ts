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
    constructor({ environment, logLevel, app_id, challenge_reward, currencies }: MCInstantOptions);
    readonly events: import("events").EventEmitter;
    private getEndpointUrl;
}
export declare enum MCIEnvironment {
    PRODUCTION = "production",
    SANDBOX = "sandbox"
}
export interface MCInstantOptions {
    environment?: MCIEnvironment;
    app_id: any;
    logger?: any;
    logLevel?: LogLevel;
    challenge_reward?: CurrencyAmount;
    currencies?: string[];
}
