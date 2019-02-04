import { BaseService } from "../core/services";
export declare type CurrencyAmount = {
    value: number;
    currency?: string;
};
export declare class CurrencyService extends BaseService {
    private _currencies;
    addCurrency(name: string): void;
    get(): string[];
}
