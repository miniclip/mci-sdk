import { ConnectionManager } from './ConnectionManager';
import { IRequest } from './IRequest';

export class PingRequest implements IRequest {
    private timer:any;
    constructor() {
        //empty
    }

    public init() {
        ConnectionManager.instance.registerHandler('open', () => this.start());
        ConnectionManager.instance.registerHandler('close', () => this.stop());
    }

    private start() {
        this.stop();

        this.timer = setInterval(() => {
            ConnectionManager.instance.send(this);
        }, 5000);
    }

    private stop() {
        clearInterval(this.timer);
        this.timer = undefined;
    }

    public stringify() {
        return 'ping';
    }
}