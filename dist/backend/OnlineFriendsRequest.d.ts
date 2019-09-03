import { IRequest } from './IRequest';
import { ISocket } from './ISocket';
export declare class OnlineFriendsRequest implements IRequest {
    private readonly friendsIds;
    private readonly retries;
    private sendMessage;
    private handleSuccess;
    constructor(friendsIds: Array<string>, retries?: number);
    send(socket: ISocket): Promise<{}>;
    private stringify;
}
