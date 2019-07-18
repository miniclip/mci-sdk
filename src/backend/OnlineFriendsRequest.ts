import { IRequest } from './IRequest';
import { ISocket } from './ISocket';
import { ResponseTypes } from './ResponseTypes';
import { SocketMessageHandler } from './SocketMessageHandler';

export class OnlineFriendsRequest implements IRequest {
    private readonly friendsIds:Array<string>;
    private readonly retries:number;

    private sendMessage:any;
    private handleSuccess:any;

    constructor(friendsIds:Array<string>, retries:number = 2) {
        this.friendsIds = friendsIds;
        this.retries = retries;
    }

    public send(socket:ISocket) {
        const messageHandler = new SocketMessageHandler(socket);
        let nTries = 0;

        return new Promise((resolve, reject) => {
            this.sendMessage = () => {
                if (nTries++ > this.retries) {
                    messageHandler.unregisterHandler(ResponseTypes.ONLINE_FRIENDS, this.handleSuccess);
                    socket.unregisterHandler('error', this.sendMessage);
                    reject();
                    return;
                }
                socket.send(this.stringify());
            };
            
            this.handleSuccess = () => resolve();
    
            messageHandler.registerHandler(ResponseTypes.ONLINE_FRIENDS, this.handleSuccess);
            socket.registerHandler('error', this.sendMessage);

            this.sendMessage();
        });
    }

    private stringify() {
        const request = {
            type:'get_online_friends',
            friends:this.friendsIds,
        };
        return JSON.stringify(request);
    }
}
