import { IRequest } from './IRequest';
import { ISocket } from './ISocket';

export class PingRequest implements IRequest {
    private timer:any;
    private delay:number;

    constructor(delay:number = 5000) {
        this.delay = delay;
    }

    public send(socket:ISocket) {
        this.stop();

        this.timer = setInterval(() => {
            socket.send('ping');
        }, this.delay);

        return Promise.resolve();
    }

    public stop() {
        clearInterval(this.timer);
    }
}