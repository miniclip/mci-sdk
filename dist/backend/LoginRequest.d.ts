import { IRequest } from './IRequest';
import { ISocket } from './ISocket';
export declare class LoginRequest implements IRequest {
    private readonly appID;
    private readonly retries;
    private signature;
    private sendMessage;
    private handleSuccess;
    private handleError;
    constructor(appID: string, retries?: number);
    send(socket: ISocket): Promise<{}>;
    private getSignature;
    private stringify;
}
