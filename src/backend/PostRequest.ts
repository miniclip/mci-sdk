import { IPostPayload, IPostRequest, IPostResponse } from './IPostMessage';
import { IRequest } from './IRequest';
import { ISocket } from './ISocket';
import { ResponseTypes } from './ResponseTypes';
import { SocketMessageHandler } from './SocketMessageHandler';
export class PostRequest implements IRequest {
    protected type:string;
    protected recipientID:string;
    protected payload:IPostPayload;
    private responseType:string;
    private retries:number;

    private handleSuccess:any;
    private handleError:any;
    private sendMessageLooper:any;

    constructor(type:string, recipientID:string, payload?:IPostPayload, responseType:string = ResponseTypes.OK, retries:number = 2) {
        this.type = type;
        this.recipientID = recipientID;
        this.responseType = responseType;
        this.payload = payload || { requestID:'', okConfirmation:false };
        this.payload.requestID = this.payload.requestID || `${recipientID}_${new Date().getTime()}`;
        this.payload.okConfirmation = this.responseType === ResponseTypes.OK;
        this.retries = retries;
    }

    public send(socket:ISocket) {
        const messageHandler = new SocketMessageHandler(socket);
        let nTries = 0;
        
        return new Promise((resolve, reject) => {
            const clear = () => {
                messageHandler.unregisterPostHandler(this.responseType, this.handleSuccess);
                messageHandler.unregisterHandler(ResponseTypes.POST_FAILURE, this.handleError);
                socket.unregisterHandler('close', this.handleError);
        
                clearInterval(this.sendMessageLooper);
                this.sendMessageLooper = undefined;
            };

            this.handleSuccess = (message:IPostResponse) => {
                if (message.payload.requestID === this.payload.requestID) {
                    clear();
                    resolve(message);
                }
            };

            this.handleError = (err:any) => {
                const reason = err != null && "reason" in err ? err.reason : "";
                clear();
                reject(reason);
            };

            const sendMessage = () => {
                if (nTries++ > this.retries) {
                    clear();
                    reject();
                    return;
                }
                
                socket.send(this.stringify());

                if (!this.responseType) {
                    resolve();
                }
            };

            if (this.responseType) {
                messageHandler.registerPostHandler(this.responseType, this.handleSuccess);
                messageHandler.registerHandler(ResponseTypes.POST_FAILURE, this.handleError);
                socket.registerHandler('close', this.handleError);
                this.sendMessageLooper = setInterval(sendMessage, 1000);
            }
            
            sendMessage();
        });
    }

    private stringify():string {
        const request:IPostRequest = {
            type:ResponseTypes.POST,
            recipient_id:this.recipientID,
            payload:this.payload,
            id:this.type,
        };
        return JSON.stringify(request);
    }
}
