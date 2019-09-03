import { IPostResponse } from './IPostMessage';
import { ISocket } from './ISocket';
import { ResponseTypes } from './ResponseTypes';
export interface ISocketMessageHandler {
    registerHandler(type: ResponseTypes, callback: (data: any) => void): void;
    unregisterHandler(type: ResponseTypes, callback: (data: any) => void): void;
    registerPostHandler(type: string, callback: (data: IPostResponse) => void): void;
    unregisterPostHandler(type: string, callback: (data: IPostResponse) => void): void;
}
export declare class SocketMessageHandler implements ISocketMessageHandler {
    private handlers;
    private postHandlers;
    constructor(socket: ISocket);
    registerHandler(type: ResponseTypes, callback: (data: any) => void): void;
    unregisterHandler(type: ResponseTypes, callback: (data: any) => void): void;
    registerPostHandler(type: string, callback: (data: IPostResponse) => void): void;
    unregisterPostHandler(type: string, callback: (data: IPostResponse) => void): void;
}
