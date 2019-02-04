import { BaseService } from "../core/services";

export type CurrencyAmount = {
    value:number;
    currency?:string
}

const BASE_CURRENCIES = ["points"];

export class CurrencyService extends BaseService{

    private _currencies:Array<string> = BASE_CURRENCIES.slice(0);

    public addCurrency(name:string){
        if (this._currencies.find((e)=> (e == name)) == undefined){
            this._currencies.push(name);
        }
    }

    public get() {
        //@todo get currencies from api

        return this._currencies;
    }
}
