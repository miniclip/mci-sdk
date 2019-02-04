export interface IStorage {

    get(key:string): Promise<Object>;
    set(key:string, value:Object):Promise<void>;
    flush():Promise<boolean>;
}

const KEY_PREFIX = "_mc:";

export class InstantStorage implements IStorage {
    private static mcStoragePayload: string = 'mc:instantPayload';

    public get(key:string):Promise<Object> {
        const final_key = KEY_PREFIX + key;
        return FBInstant.player.getDataAsync([final_key]).then((response) => {
            if (final_key in response){
                return response[final_key];
            }

            return {};
        });
    }

    /**
     * Set data async storage
     */
    public set(key:string, values: Object) {
        let content = {};
        const final_key = KEY_PREFIX + key;
        content[final_key] = values;
        return FBInstant.player.setDataAsync(content);
    }

    public flush() {
        return FBInstant.player.flushDataAsync();
    }
}