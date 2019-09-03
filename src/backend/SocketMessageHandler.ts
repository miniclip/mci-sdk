import { IPostResponse } from './IPostMessage';
import { ISocket } from './ISocket';
import { ResponseTypes } from './ResponseTypes';

export interface ISocketMessageHandler {
    registerHandler(type:ResponseTypes, callback:(data:any) => void):void;
    unregisterHandler(type:ResponseTypes, callback:(data:any) => void):void;
    registerPostHandler(type:string, callback:(data:IPostResponse) => void):void;
    unregisterPostHandler(type:string, callback:(data:IPostResponse) => void):void;
}

export class SocketMessageHandler implements ISocketMessageHandler{
    private handlers:Map<ResponseTypes, Array<(data:any) => void>> = new Map();
    private postHandlers:Map<string, Array<(data:IPostResponse) => void>> = new Map();

    constructor(socket:ISocket) {
        socket.registerHandler('message', (ev:MessageEvent) => {
            if (ev.data === 'pong') {
                return;
            }

            const message = ev.data ? JSON.parse(ev.data) : null;
            
            const handlers = this.handlers.get(message.type);
            if (handlers) {
                for (const handler of handlers) {
                    handler(message);
                }
            }

            if (message.type === ResponseTypes.POST) {
                const postMessage:IPostResponse = message as IPostResponse;
                const postHandlers = this.postHandlers.get(postMessage.id);
                if (postHandlers) {
                    for (const handler of postHandlers) {
                        handler(message as IPostResponse);
                    }
                }
            }
        });
    }
    
    public registerHandler(type:ResponseTypes, callback:(data:any) => void) {
        let  typeHandlers = this.handlers.get(type);
        if (!typeHandlers) {
            typeHandlers = new Array();
            typeHandlers.push(callback);
            this.handlers.set(type, typeHandlers);
        } else {
            typeHandlers.push(callback);
        }
    }

    public unregisterHandler(type:ResponseTypes, callback:(data:any) => void) {
        const typeHandlers = this.handlers.get(type);
        if (typeHandlers) {
            const index = typeHandlers.indexOf(callback);
            if (index > -1) {
                typeHandlers.splice(index, 1);
            }
        }
    }

    public registerPostHandler(type:string, callback:(data:IPostResponse) => void) {
        let  typeHandlers = this.postHandlers.get(type);
        if (!typeHandlers) {
            typeHandlers = new Array();
            typeHandlers.push(callback);
            this.postHandlers.set(type, typeHandlers);
        } else {
            typeHandlers.push(callback);
        }
    }

    public unregisterPostHandler(type:string, callback:(data:IPostResponse) => void) {
        const typeHandlers = this.postHandlers.get(type);
        if (typeHandlers) {
            const index = typeHandlers.indexOf(callback);
            if (index > -1) {
                typeHandlers.splice(index, 1);
            }
        }
    }
}
