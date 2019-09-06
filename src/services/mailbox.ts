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

}
