export interface IDataStore {
    get(key: string, def_value?: any): any;
    set(key: string, value: any): void;
    clear(): void;
}
export declare class Store implements IDataStore {
    private state;
    private initial;
    constructor(initial?: any);
    get(key: string, def_value?: any): any;
    set(key: string, value: any): void;
    clear(): void;
}
