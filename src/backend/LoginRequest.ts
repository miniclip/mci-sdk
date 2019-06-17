import { ConnectionManager } from './ConnectionManager';
import { IRequest } from './IRequest';
import { ResponseHandlersManager } from './ResponseHandlersManager';
import { ResponseTypes } from './ResponseTypes';

export class LoginRequest implements IRequest {
    private readonly appID:string;

    private nRetries:number = 0;
    private sendMessage:any;
    private handleSuccess:any;
    private handleError:any;
    private request:any;

    constructor(appID:string) {
        this.appID = appID;
    }

    public send() {
        return new Promise((resolve, reject) => {
            this.sendMessage = () => {
                if (this.nRetries++ >= 3) {
                    this.handleError();
                    return;
                }
                
                ConnectionManager.instance.send(this);
            };
            
            this.handleSuccess = () => {
                this.stop();
                resolve();
            };

            this.handleError = () => {
                this.stop();
                reject();
            };

            ResponseHandlersManager.instance.registerHandler(ResponseTypes.LOGIN_SUCCESS, this.handleSuccess);
            ResponseHandlersManager.instance.registerHandler(ResponseTypes.LOGIN_FAILURE, this.handleError);
            ConnectionManager.instance.registerHandler('close', this.handleError);
            ConnectionManager.instance.registerHandler('error', this.sendMessage);
            
            (window as any).FBInstant.player.getSignedPlayerInfoAsync().then((result:any) => {
                this.request = {
                    type:'login',
                    app_id:this.appID,
                    'x-fb-signature':result.getSignature(),
                };

                this.sendMessage();
            }, reject);
        });
    }

    private stop() {
        ResponseHandlersManager.instance.unregisterHandler(ResponseTypes.LOGIN_SUCCESS, this.handleSuccess);
        ResponseHandlersManager.instance.unregisterHandler(ResponseTypes.LOGIN_FAILURE, this.handleError);
        ConnectionManager.instance.unregisterHandler('close', this.handleError);
        ConnectionManager.instance.unregisterHandler('error', this.sendMessage);
        this.handleSuccess = undefined;
        this.handleError = undefined;
        this.handleError = undefined;
    }

    public stringify() {
        return JSON.stringify(this.request);
    }
}
