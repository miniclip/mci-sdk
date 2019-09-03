import { IRequest } from './IRequest';
import { ISocket } from './ISocket';
export declare class OkRequest implements IRequest {
    private requestID;
    private recipientID;
    constructor(requestID: string, recipientID: string);
    send(socket: ISocket): Promise<void>;
    private stringify;
}
