import { ConnectionManager } from './ConnectionManager';
import { IPostPayload, IPostRequest, IPostResponse } from './IPostMessage';
import { IRequest } from './IRequest';
import { ResponseHandlersManager } from './ResponseHandlersManager';
import { ResponseTypes } from './ResponseTypes';

export class PostRequest implements IRequest {
    protected type:string;
    protected recipientID:string;
    protected payload:IPostPayload;
    private responseType:string;
    
    private retries:number;
    private nTries:number = 0;

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
        this.retries = retries < 0 ? 0 : retries;
    }

    public send() {
        return new Promise((resolve, reject) => {
            this.handleSuccess = (message:IPostResponse) => {
                if (message.payload.requestID === this.payload.requestID) {
                    this.clear();
                    resolve(message);
                }
            };

            this.handleError = () => {
                this.clear();
                reject();
            };

            const sendMessage = () => {
                if (this.nTries > this.retries) {
                    this.clear();
                    reject();
                    return;
                }

                this.nTries++;
                ConnectionManager.instance.send(this);

                if(!this.responseType) {
                    resolve();
                }
            };

            if(this.responseType) {
                ResponseHandlersManager.instance.registerPostHandler(this.responseType, this.handleSuccess);
                ResponseHandlersManager.instance.registerHandler(ResponseTypes.POST_FAILURE, this.handleError);
                ConnectionManager.instance.registerHandler('close', this.handleError);
                this.sendMessageLooper = setInterval(sendMessage, 1000);
            }
            
            sendMessage();
        });
    }

    private clear() {
        ResponseHandlersManager.instance.unregisterPostHandler(this.responseType, this.handleSuccess);
        ResponseHandlersManager.instance.unregisterHandler(ResponseTypes.POST_FAILURE, this.handleError);
        ConnectionManager.instance.unregisterHandler('close', this.handleError);

        clearInterval(this.sendMessageLooper);
        this.sendMessageLooper = undefined;
    }

    public stringify(): string {
        const request:IPostRequest = {
            type:ResponseTypes.POST,
            recipient_id:this.recipientID,
            payload:this.payload,
            id:this.type,
        };
        return JSON.stringify(request);
    }
}
