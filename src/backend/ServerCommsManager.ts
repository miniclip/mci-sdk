import { IPostResponse } from './IPostMessage';
import { IRequest } from './IRequest';
import { ISocket } from './ISocket';
import { LoginRequest } from './LoginRequest';
import { OkRequest } from './OkRequest';
import { PingRequest } from './PingRequest';
import { ResponseTypes } from './ResponseTypes';
import { SocketMessageHandler } from './SocketMessageHandler';

export class ServerCommsManager extends SocketMessageHandler {
    private socket:ISocket;
    private loginRequest:LoginRequest;
    private pingRequest:PingRequest;

    private isLoggedIn:Promise<any>;
    private loginResolved:() => void;
    private loginRejected:() => void;

    constructor(appID:string, socket:ISocket) {
        super(socket);

        this.socket = socket;
        this.socket.registerHandler('open', () => this.onSocketOpen());
        this.socket.registerHandler('close', () => this.onSocketClosed());

        this.loginRequest = new LoginRequest(appID);
        this.pingRequest = new PingRequest();
        
        this.registerHandler(ResponseTypes.POST, (message:IPostResponse) => { 
            if (message.payload.okConfirmation) {
                this.send(new OkRequest(message.payload.requestID, message.sender_id));
            }
        });

        this.setupLoginPromise();
    }

    public connect() {
        this.socket.connect();
        return this.isLoggedIn;
    }

    private onSocketOpen() {
        this.loginRequest.send(this.socket).then(() => {
            this.pingRequest.send(this.socket);
            this.loginResolved();
        }, this.loginRejected);
    }

    private onSocketClosed() {
        this.pingRequest.stop();
        this.setupLoginPromise();
    }

    public send(request:IRequest) {
        return new Promise((resolve, reject) => {
            this.isLoggedIn.then(() => {
                request.send(this.socket).then(resolve, reject);
            }, reject);
        });
    }

    private setupLoginPromise() {
        this.isLoggedIn = new Promise((resolve, reject) => {
            this.loginResolved = resolve;
            this.loginRejected = reject;
        });
    }
}