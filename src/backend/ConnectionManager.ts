import { IRequest } from './IRequest';
import { PingRequest } from './PingRequest';
import { getRetryMSDelay } from './Utils';

export class ConnectionManager {
    private _connected:boolean = false;
    public get connected():boolean {
        return this._connected;
    }

    public static _instance:ConnectionManager = new ConnectionManager();
    public static get instance():ConnectionManager {
        if (!this._instance) {
            this._instance = new ConnectionManager();
        }

        return this._instance;
    }

    private socket:WebSocket;
    private handlers:Map<keyof WebSocketEventMap, Array<(data:any) => void>>;

    private constructor() {
        this.handlers = new Map();
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

    public connect(url:string, retries:number = 5) {
        let nTries:number = 0;
        if (this.connected) {
            return;
        }

        PingRequest.init();
        
        const connectToServer = () => {
            return new Promise((resolve, reject) => {
                this.socket = new WebSocket(url);
    
                this.socket.onopen = (ev:Event) => {
                    this._connected = true;
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
                    this._connected = false;
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

    public send(request:IRequest) {
        if (this.socket && this._connected) {
            this.socket.send(request.stringify());
        }
    }
}
