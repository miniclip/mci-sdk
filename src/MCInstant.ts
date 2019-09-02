import { LogLevel, getLogger, Logger } from "./logger";
import { NetworkManager } from "./core/network";
import { PublicWallet, WalletService } from "./services/wallet";
import { Modules } from "./services";
import DIContainer from "./utils/dicontainer";
import { ChallengeService } from "./services/challenges";
import { CurrencyService, CurrencyAmount } from "./services/currencies";
import { Store } from "./store";
import { SessionService } from "./services/session";
import { InstantStorage } from "./utils/instant-storage";
import { MessagesService } from "./services/messages";
import { EVENT_WS_CONNECTED } from "./events";
import { LobbyService } from "./services/lobby";

declare var VERSION:string;

export class MCInstant {
  private static loggerName = "mc:instant";
  public static version = VERSION;

  public di: DIContainer;
  private logger: Logger;

  public wallet: PublicWallet; 
  public challenges: ChallengeService;
  public lobby: LobbyService;
  public messages: MessagesService;

  constructor({
    environment = MCIEnvironment.PRODUCTION,
    logLevel = LogLevel.INFO,
    app_id = "",
    challenge_reward = { value: 100, currency: "points" },
    currencies = [ "points" ]
  }: MCInstantOptions) {
    this.di = new DIContainer();

    this.logger = getLogger(MCInstant.loggerName);
    this.logger.setLevel(logLevel);

    const _store = this.di.bind(Modules.GLOBAL_STORE, new Store());
    const _currencies:CurrencyService = new CurrencyService();
    _currencies.clear();
    _currencies.addCurrencies(currencies);

    _store.set("challenge_reward", challenge_reward);

    const network = new NetworkManager({
      app_id: app_id,
      environment: environment,
      //endpointURL: this.getEndpointUrl(environment, app_id),
      container: this.di
    });
    this.di.bind(Modules.NETWORK, network);

    this.di.bind(Modules.MESSAGES, new MessagesService())

    this.di.bind(Modules.SESSION, new SessionService());
    this.di.bind(Modules.INSTANT_STORAGE, new InstantStorage());
    this.di.bind(Modules.CURRENCIES, _currencies);
    this.di.bind(Modules.WALLET, new WalletService());
    this.di.bind(Modules.CHALLENGES, new ChallengeService());
    this.di.bind(Modules.LOBBY, new LobbyService());

    this.di.boot();

    this.challenges = this.di.get(Modules.CHALLENGES);
    this.wallet = (<WalletService>this.di.get(Modules.WALLET)).publicWallet;
    this.lobby = <LobbyService>this.di.get(Modules.LOBBY);
    this.messages = <MessagesService>this.di.get(Modules.MESSAGES);

    network.ws.connect().then(() => {
      this.events.emit(EVENT_WS_CONNECTED)
    }, () => {
      console.log("Failed to connect");
    })
  }

  get events() {
    return this.di.events;
  }

}

export enum MCIEnvironment {
  PRODUCTION ="production",
  SANDBOX = "sandbox"
}

export interface MCInstantOptions {
  environment?: MCIEnvironment;
  app_id: any;
  
  logger?: any;
  logLevel?: LogLevel;
  
  challenge_reward?: CurrencyAmount;
  currencies?: string[]
}
