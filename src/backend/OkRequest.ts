import { IRequest } from './IRequest';
import { ISocket } from './ISocket';
import { ResponseTypes } from './ResponseTypes';

export class OkRequest implements IRequest {
    private requestID:string;
    private recipientID:string;

    constructor(requestID:string, recipientID:string) {
        this.requestID = requestID;
        this.recipientID = recipientID;
    }

    public send(socket:ISocket) {
        socket.send(this.stringify());
        return Promise.resolve();
    }

    private stringify() {
        return JSON.stringify({
            type:ResponseTypes.POST,
            recipient_id:this.recipientID,
            payload:{
                requestID:this.requestID,
            },
            id:ResponseTypes.OK,
        });
    }
}
