import DIContainer from "../utils/dicontainer";
import { Modules } from ".";
import { InstantStorage } from "../utils/instant-storage";
import { CurrencyService } from "./currencies";
import { BaseService } from "../core/services";
import { EVENT_WALLET_BALANCE_UPDATED } from "../events";

const WALLET_STORAGE_KEY = "_wallet";

/**
 * @internalapi
 */
export class WalletService extends BaseService {
    private _publicWallet?: PublicWallet;
    private _cloud: InstantStorage;
    private _currencies: CurrencyService;
    
    private _wallet:Object = {};
    //private initialized:boolean = false;
    
    constructor() {
        super();
        //this.initialized = true;
    }

    _boot(){
        this._currencies = this.container.get(Modules.CURRENCIES);
        this._cloud = this.container.get(Modules.INSTANT_STORAGE);

        this._wallet = this._currencies.get().reduce((callback, cur) => ({...callback, [cur]: 0}), {});
    }

    /**
     * Get currencies default object build from api
     **/
    public get currencies (){
        return this._wallet;
    }

    /**
     * Get Balance, if empty returns default
     **/
    public async getBalance(filter?: Array<string>) {
        let currencies = await this._cloud.get(WALLET_STORAGE_KEY);        

        Object.keys(currencies).forEach((key) => {
            (currencies[key] == null) && delete currencies[key];
        });

        let resp = Object.assign({}, Object.assign(this.currencies, currencies));
        Object.keys(resp).forEach((key) => {
            if (filter != undefined && filter.indexOf(key) == -1) delete resp[key];
        })

        return resp;
    }
    /**
     * Set Balance
     * */
    private setBalance(currency:string, value:number) {
        return new Promise((resolve, reject) => {
            if (!(currency in this.currencies)){
                throw new Error(currency + " does not exist.")
            }

            let params = {};
            params[currency] = value;
    
            const balance = Object.assign(this.currencies, params);
            this._cloud.set(WALLET_STORAGE_KEY, balance)
                .then(this._cloud.flush)
                .then((success) => {
                    this.events.emit(EVENT_WALLET_BALANCE_UPDATED)
                    resolve(success)
                });
        });
    }

    public async updateBalance(value:number, currency:string) {
        //get balance from network
        try {
            await this.setBalance(currency, value);
        } catch (error){
            //console.error(error);
            return {};
        }
        return await this.getBalance([currency]);
    }

    public async addBalance(value:number, currency:string){
        let balances = await this.getBalance();
        let currentValue = balances[currency] || 0;
        currentValue += value ;

        console.log("Add balance by ", value, currency);
        try {
            await this.setBalance(currency, currentValue);
            return true;
        } catch(error){
            console.error(error);
        }
        return false;
    }

    public get publicWallet() {
        if (!this._publicWallet) {
            this._publicWallet = new PublicWallet(this);
        }
        return this._publicWallet;
    }
}

/**
 * User wallet
 */
export class PublicWallet {

    private wallet: WalletService;

    constructor(wallet: WalletService) {
        this.wallet = wallet;
    }

    /**
     * Fetch the balance 
     * @param filter 
     */
    public getBalance(filter?: Array<string>) {
        return this.wallet.getBalance(filter);
    }

    /**
     * Add a specified amount to the specified currency wallet
     * @deprecated Will be removed in the near future
     * @param amount 
     * @param currency Name of the currency to add to
     */
    public addBalance(amount:number, currency:string){
        return this.wallet.addBalance(amount, currency);
    }

    /**
     * Sets the specified $currency wallet to the specified $amount
     * @deprecated Will be removed in the near future
     * @param amount
     * @param currency Name of the currency to set
     */
    public updateBalance(amount:number, currency:string){
        return this.wallet.updateBalance(amount, currency);
    }
}
