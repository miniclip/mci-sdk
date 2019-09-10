import { BaseService } from "../core/services";
export declare class MailboxService extends BaseService {
    private network;
    private initialFetchResolver;
    readonly initialFetch: Promise<void>;
    constructor();
    _boot(): void;
    send(recipient: string, messages: Array<any>): Promise<String>;
    read(): Promise<Array<any>>;
}
