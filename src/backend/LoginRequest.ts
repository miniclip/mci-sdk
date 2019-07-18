import { IRequest } from './IRequest';
import { ISocket } from './ISocket';
import { ResponseTypes } from './ResponseTypes';
import { SocketMessageHandler } from './SocketMessageHandler';

export class LoginRequest implements IRequest {
    private readonly appID:string;
    private readonly retries:number;

    private signature:string;

    private sendMessage:any;
    private handleSuccess:any;
    private handleError:any;

    constructor(appID:string, retries:number = 2) {
        this.appID = appID;
        this.retries = retries;
    }

    public send(socket:ISocket) {
        const messageHandler = new SocketMessageHandler(socket);
        let nTries = 0;

        return new Promise((resolve, reject) => {
            this.handleError = () => {
                messageHandler.unregisterHandler(ResponseTypes.LOGIN_SUCCESS, this.handleSuccess);
                messageHandler.unregisterHandler(ResponseTypes.LOGIN_FAILURE, this.handleError);
                socket.unregisterHandler('error', this.sendMessage);
                reject();
            };
    
            this.sendMessage = () => {
                if (nTries++ > this.retries) {
                    this.handleError();
                    return;
                }
                
                this.getSignature().then(() => {
                    socket.send(this.stringify());
                }, this.sendMessage);
            };
            
            this.handleSuccess = () => resolve();
    
            messageHandler.registerHandler(ResponseTypes.LOGIN_SUCCESS, this.handleSuccess);
            messageHandler.registerHandler(ResponseTypes.LOGIN_FAILURE, this.handleError);
            socket.registerHandler('error', this.sendMessage);
    
            this.sendMessage();
        });
    }

    private getSignature():Promise<any> {
        if (this.signature) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            (window as any).FBInstant.player.getSignedPlayerInfoAsync().then((result:any) => {
                this.signature = result.getSignature();
                resolve();
            }, reject);
        });
    }

    private stringify() {
        const request = {
            type:'login',
            app_id:this.appID,
            'x-fb-signature':this.signature,
        };
        return JSON.stringify(request);
    }
}
