import { BaseService } from "../core/services";
export declare class MessagesService extends BaseService {
    private network;
    private listeners;
    private messageHandler;
    _boot(): void;
    send(messageID: string, recipientID: string, payload?: any): Promise<boolean>;
    listen(messageID: string, callback: Function): void;
    unlisten(messageID: string, callback: Function): void;
    private handler;
}
