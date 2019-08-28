export interface ISocket {
    send(message:string):void;
    registerHandler(type:keyof WebSocketEventMap, callback:(data:any) => void):void;
    unregisterHandler(type:keyof WebSocketEventMap, callback:(data:any) => void):void;
    connect(retries?:number):void;
}
