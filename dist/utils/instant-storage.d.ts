export interface IStorage {
    get(key: string): Promise<Object>;
    set(key: string, value: Object): Promise<void>;
    flush(): Promise<boolean>;
}
export declare class InstantStorage implements IStorage {
    private static mcStoragePayload;
    get(key: string): Promise<Object>;
    set(key: string, values: Object): Promise<any>;
    flush(): Promise<boolean>;
}
