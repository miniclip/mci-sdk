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

export class MCInstant {
  private static loggerName = "mc:instant";

  public di: DIContainer;
  private logger: Logger;

  public wallet: PublicWallet; 
  public challenges: ChallengeService;

  constructor({
    endpoint = "https://fbi-webhooks-server-dev.miniclippt.com/apps/",
    logLevel = LogLevel.INFO,
    app_id = 0,
    challenge_reward = { value: 100, currency: "points" },
    currencies = [ "points" ]
  }: MCInstantOptions = {}) {
    this.di = new DIContainer();

    this.logger = getLogger(MCInstant.loggerName);
    this.logger.setLevel(logLevel);

    const _store = this.di.bind(Modules.GLOBAL_STORE, new Store());
    const _currencies:CurrencyService = new CurrencyService();
    _currencies.clear();
    _currencies.addCurrencies(currencies);

    _store.set("challenge_reward", challenge_reward);

    const network = new NetworkManager({
      endpointURL: endpoint + app_id,
      container: this.di
    });
    this.di.bind(Modules.NETWORK, network);

    this.di.bind(Modules.SESSION, new SessionService());
    this.di.bind(Modules.INSTANT_STORAGE, new InstantStorage());
    this.di.bind(Modules.CURRENCIES, _currencies);
    this.di.bind(Modules.WALLET, new WalletService());
    this.di.bind(Modules.CHALLENGES, new ChallengeService());

    this.di.boot();

    this.challenges = this.di.get(Modules.CHALLENGES);
    this.wallet = (<WalletService>this.di.get(Modules.WALLET)).publicWallet;
  }

  get events() {
    return this.di.events;
  }
}

export interface MCInstantOptions {
  endpoint?: string;
  logger?: any;
  logLevel?: LogLevel;
  app_id?: number;
  challenge_reward?: CurrencyAmount;
  currencies?: string[]
}
