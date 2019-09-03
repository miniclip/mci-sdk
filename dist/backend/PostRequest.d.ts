import { IPostPayload } from './IPostMessage';
import { IRequest } from './IRequest';
import { ISocket } from './ISocket';
export declare class PostRequest implements IRequest {
    protected type: string;
    protected recipientID: string;
    protected payload: IPostPayload;
    private responseType;
    private retries;
    private handleSuccess;
    private handleError;
    private sendMessageLooper;
    constructor(type: string, recipientID: string, payload?: IPostPayload, responseType?: string, retries?: number);
    send(socket: ISocket): Promise<{}>;
    private stringify;
}
