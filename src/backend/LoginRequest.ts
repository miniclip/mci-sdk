import { ConnectionManager } from './ConnectionManager';
import { IRequest } from './IRequest';
import { ResponseHandlersManager } from './ResponseHandlersManager';
import { ResponseTypes } from './ResponseTypes';

export class LoginRequest implements IRequest {
    private readonly appID:string;
    private readonly retries:number;

    private nRetries:number = 0;
    private signature:string;

    private sendMessage:any;
    private handleSuccess:any;
    private handleError:any;

    private socketOpen:boolean = false;
    private loginRequested:boolean = false;
    private loggedIn:boolean = false;

    private onLogin:() => void;
    private onError:() => void;

    constructor(appID:string, retries:number = 2) {
        this.appID = appID;
        this.retries = retries;
        ConnectionManager.instance.registerHandler('open', () => this.onSocketOpen());
        ConnectionManager.instance.registerHandler('close', () => this.onSocketClosed());
    }

    private onSocketOpen() {
        this.socketOpen = true;
        this.login();
    }

    private onSocketClosed() {
        this.socketOpen = false;
        this.loggedIn = false;
    }

    public send(onLogin:() => void, onError:() => void) {
        this.onLogin = onLogin;
        this.onError = onError;

        this.loginRequested = true;
        this.socketOpen = ConnectionManager.instance.connected;
        this.login();
    }

    private login() {
        if(!this.socketOpen || !this.loginRequested || this.loggedIn) {
            return;
        }

        const getSignature = () => {
            return new Promise((resolve, reject) => {
                if (this.signature) {
                    resolve();
                    return;
                }

                (window as any).FBInstant.player.getSignedPlayerInfoAsync().then((result:any) => {
                    this.signature = result.getSignature();
                    resolve();
                }, reject);
            });
        };

        this.handleError = () => {
            this.clearHandlers();
            if(this.onError) {
                this.onError();
            }
        };

        this.sendMessage = () => {
            if (this.nRetries++ > this.retries) {
                this.handleError();
                return;
            }
            getSignature().then(() => {
                ConnectionManager.instance.send(this);
            }, this.sendMessage);
        };
        
        this.handleSuccess = () => {
            this.loggedIn = true;
            this.onLogin();
        };

        ResponseHandlersManager.instance.registerHandler(ResponseTypes.LOGIN_SUCCESS, this.handleSuccess);
        ResponseHandlersManager.instance.registerHandler(ResponseTypes.LOGIN_FAILURE, this.handleError);
        ConnectionManager.instance.registerHandler('error', this.sendMessage);

        this.sendMessage();
    }

    private clearHandlers() {
        ResponseHandlersManager.instance.unregisterHandler(ResponseTypes.LOGIN_SUCCESS, this.handleSuccess);
        ResponseHandlersManager.instance.unregisterHandler(ResponseTypes.LOGIN_FAILURE, this.handleError);
        ConnectionManager.instance.unregisterHandler('error', this.sendMessage);
        this.sendMessage = undefined;
        this.handleSuccess = undefined;
        this.handleError = undefined;
        this.nRetries = 0;
    }

    public stringify() {
        const request = {
            type:'login',
            app_id:this.appID,
            'x-fb-signature':this.signature,
        };
        return JSON.stringify(request);
    }
}
