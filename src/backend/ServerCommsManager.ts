import { IPostResponse } from './IPostMessage';
import { IRequest } from './IRequest';
import { ISocket } from './ISocket';
import { LoginRequest } from './LoginRequest';
import { OkRequest } from './OkRequest';
import { PingRequest } from './PingRequest';
import { ResponseTypes } from './ResponseTypes';
import { SocketMessageHandler, ISocketMessageHandler } from './SocketMessageHandler';
import { CallbackContainer, Action } from '@/utils/data';

const EMPTY_FUNC = () => { /* empty */ };

export interface IServerCommManager extends ISocketMessageHandler {
    connect():Promise<any>;
    send(request:IRequest):Promise<any>;

    onConnect:Action;
}

export class ServerCommsManager extends SocketMessageHandler implements IServerCommManager {
    private socket:ISocket;
    private loginRequest:LoginRequest;
    private pingRequest:PingRequest;
    
    private requestsQueue:Array<(loginSuccess:boolean) => void>;
    private isLoggedIn:boolean = false;

    public onConnect:Action = new Action();

    constructor(appID:string, socket:ISocket) {
        super(socket);

        this.socket = socket;
        this.socket.registerHandler('open', () => this.onSocketOpen());
        this.socket.registerHandler('close', () => this.onSocketClosed());

        this.loginRequest = new LoginRequest(appID);
        this.pingRequest = new PingRequest();
        this.requestsQueue = new Array();
        
        this.registerHandler(ResponseTypes.POST, (message:IPostResponse) => {
            if (message.payload.okConfirmation) {
                this.send(new OkRequest(message.payload.requestID, message.sender_id)).then(EMPTY_FUNC, EMPTY_FUNC);
            }
        });
    }

    public connect() {
        return new Promise ((resolve, reject) => {
            this.requestsQueue.push((loginSuccess:boolean) => {
                if (loginSuccess){
                    this.onConnect.emit();
                    resolve();
                } else {
                    reject();
                }
            });
            this.socket.connect();
        });
    }

    private onSocketOpen() {
        this.loginRequest.send(this.socket).then(() => {
            this.isLoggedIn = true;
            this.pingRequest.send(this.socket).then(EMPTY_FUNC, EMPTY_FUNC);
            this.resolveRequests(true);
        }, () => this.resolveRequests(false));
    }

    private onSocketClosed() {
        this.isLoggedIn = false;
        this.pingRequest.stop();
    }

    private resolveRequests(loginSuccess:boolean) {
        while (this.requestsQueue.length > 0) {
            const request = this.requestsQueue.pop();
            if (request) {
                request(loginSuccess);
            }
        }
    }

    public send(request:IRequest) {
        return new Promise((resolve, reject) => {
            if (this.isLoggedIn) {
                request.send(this.socket).then(resolve, reject);
            } else {
                this.requestsQueue.push((loginSuccess:boolean) => {
                    if (loginSuccess) {
                        request.send(this.socket).then(resolve, reject);
                    } else {
                        reject();
                    }
                });
            }
        });
    }
}
