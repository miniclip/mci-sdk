import { IRequest } from './IRequest';
import { ISocket } from './ISocket';
import { SocketMessageHandler, ISocketMessageHandler } from './SocketMessageHandler';
import { Action } from '@/utils/data';
export interface IServerCommManager extends ISocketMessageHandler {
    connect(): Promise<any>;
    send(request: IRequest): Promise<any>;
    onConnect: Action;
}
export declare class ServerCommsManager extends SocketMessageHandler implements IServerCommManager {
    private socket;
    private loginRequest;
    private pingRequest;
    private requestsQueue;
    private isLoggedIn;
    onConnect: Action;
    constructor(appID: string, socket: ISocket);
    connect(): Promise<{}>;
    private onSocketOpen;
    private onSocketClosed;
    private resolveRequests;
    send(request: IRequest): Promise<{}>;
}
