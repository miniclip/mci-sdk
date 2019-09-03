import { ISocket } from './ISocket';
export declare class Socket implements ISocket {
    private url;
    private socket;
    private handlers;
    constructor(url: string);
    registerHandler(type: keyof WebSocketEventMap, callback: (data: any) => void): void;
    unregisterHandler(type: keyof WebSocketEventMap, callback: (data: any) => void): void;
    connect(retries?: number): void;
    private callHandlers;
    send(message: string): void;
}
