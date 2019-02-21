import { BaseService } from "../core/services";
export declare class WalletService extends BaseService {
    private _publicWallet?;
    private _cloud;
    private _currencies;
    private _wallet;
    constructor();
    _boot(): void;
    readonly currencies: Object;
    getBalance(filter?: Array<string>): Promise<Object>;
    private setBalance;
    updateBalance(value: number, currency: string): Promise<Object>;
    addBalance(value: number, currency: string): Promise<boolean>;
    readonly publicWallet: PublicWallet;
}
export declare class PublicWallet {
    private wallet;
    constructor(wallet: WalletService);
    getBalance(filter?: Array<string>): Promise<Object>;
    addBalance(value: number, currency: string): Promise<boolean>;
}
