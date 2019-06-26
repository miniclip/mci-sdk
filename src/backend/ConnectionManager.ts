import { IRequest } from './IRequest';
import { PingRequest } from './PingRequest';
import { getRetryMSDelay } from './Utils';

export class ConnectionManager {
    private static MAX_RETRIES:number = 6;
    private connected:boolean = false;

    public static _instance:ConnectionManager = new ConnectionManager();
    public static get instance():ConnectionManager {
        if (!this._instance) {
            this._instance = new ConnectionManager();
        }

        return this._instance;
    }

    private socket:WebSocket;
    private handlers:Map<keyof WebSocketEventMap, Array<(data:any) => void>>;

    constructor() {
        this.handlers = new Map();
        new PingRequest().init();
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

    public connect(url:string) {
        const connectToServer = (nRetries:number = 0) => {
            return new Promise((resolve, reject) => {
                this.socket = new WebSocket(url);
    
                this.socket.onopen = (ev:Event) => {
                    this.connected = true;
                    nRetries = 0;
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
                    
                    if (nRetries++ < ConnectionManager.MAX_RETRIES) {
                        setTimeout(() => {
                            connectToServer().then(resolve, reject);
                        }, getRetryMSDelay(nRetries));
                    } else {
                        reject();
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
        if (this.socket && this.connected) {
            this.socket.send(request.stringify());
        }
    }
}
