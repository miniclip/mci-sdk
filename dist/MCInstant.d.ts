import { LogLevel } from "./logger";
import { PublicWallet } from "./services/wallet";
import DIContainer from "./utils/dicontainer";
import { ChallengeService } from "./services/challenges";
import { CurrencyAmount } from "./services/currencies";
import { MessagesService } from "./services/messages";
import { LobbyService } from "./services/lobby";
export declare class MCInstant {
    private static loggerName;
    static version: string;
    di: DIContainer;
    private logger;
    wallet: PublicWallet;
    challenges: ChallengeService;
    lobby: LobbyService;
    messages: MessagesService;
    constructor({ environment, logLevel, app_id, challenge_reward, currencies }: MCInstantOptions);
    readonly events: import("./utils/eventemitter").EventEmitter;
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
