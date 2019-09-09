import { BaseService } from "../core/services";
import { INetworkManager } from "../core/network";
import { Modules } from ".";

export class MailboxService extends BaseService {
    private network: INetworkManager;
    private initialFetchResolver:Function = <any>null;
    public readonly initialFetch: Promise<void>;

    constructor(){
        super();

        this.initialFetch = new Promise((resolve) => {
            this.initialFetchResolver = resolve;
        })
    }

    public _boot(){
        this.network = this.container.get(Modules.NETWORK);
    }

    public async send(recipient: string, message: any):Promise<String> {
        return new Promise(async (resolve) => {
            // const playerId = '1'; // FBInstant.player.getID();
            const url = "/players/" + recipient + "/mailbox";

            try {
                const result:String = await <any>this.network.put(url, message);
                resolve(result);
            } catch (error) {
                console.error("Failed to send message to mailbox", error);

                resolve('');
            }
        });
    }
}
