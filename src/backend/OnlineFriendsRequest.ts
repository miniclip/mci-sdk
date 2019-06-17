import { IRequest } from './IRequest';

export class OnlineFriendsRequest implements IRequest {
    private request:any;

    constructor(friendsIds:Array<string>) {
        this.request = {
            type:'get_online_friends',
            friends:friendsIds,
        };
    }

    public stringify() {
        return JSON.stringify(this.request);
    }
}
