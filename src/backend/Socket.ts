import { ISocket } from './ISocket';
import { getRetryMSDelay } from './Utils';

export class Socket implements ISocket {
    private connected:boolean = false;
    private url:string;
    private socket:WebSocket;
    private handlers:Map<keyof WebSocketEventMap, Array<(data:any) => void>>;

    constructor(url:string) {
        this.handlers = new Map();
        this.url = url;
    }

    public registerHandler(type:keyof WebSocketEventMap, callback:(data:any) => void) {
        let  typeHandlers = this.handlers.get(type);
        if (!typeHandlers) {
            typeHandlers = new Array();
            typeHandlers.push(callback);
            this.handlers.set(type, typeHandlers);
        } else {
            typeHandlers.push(callback);
        }
    }

    public unregisterHandler(type:keyof WebSocketEventMap, callback:(data:any) => void) {
        const typeHandlers = this.handlers.get(type);
        if (typeHandlers) {
            const index = typeHandlers.indexOf(callback);
            if (index > -1) {
                typeHandlers.splice(index, 1);
            }
        }

    }

    public connect(retries:number = 5) {
        let nTries:number = 0;
        if (this.connected) {
            return Promise.resolve();
        }
        
        const connectToServer = () => {
            return new Promise((resolve, reject) => {
                this.socket = new WebSocket(this.url);
    
                this.socket.onopen = (ev:Event) => {
                    this.connected = true;
                    nTries = 0;
                    this.callHandlers('open', ev);
                    resolve();
                };

                this.socket.onerror = (ev:Event) => {
                    this.callHandlers('error', ev);
                };

                this.socket.onmessage = (ev:MessageEvent) => {
                    this.callHandlers('message', ev);
                };
    
                this.socket.onclose = (ev:CloseEvent) => {
                    this.connected = false;
                    this.callHandlers('close', ev);
                    
                    if (++nTries > retries) {
                        reject();
                    } else {
                        setTimeout(() => {
                            connectToServer().then(resolve, reject);
                        }, getRetryMSDelay(nTries));
                    }
                };
            });
        };

        return connectToServer();
    }

    private callHandlers(type:keyof WebSocketEventMap, data:any) {
        if (type) {
            const handlers = this.handlers.get(type);
            if (handlers) {
                for (const handler of handlers) {
                    handler(data);
                }
            }
        }
    }

    public send(message:string) {
        if (this.socket && this.connected) {
            this.socket.send(message);
        }
    }
}
