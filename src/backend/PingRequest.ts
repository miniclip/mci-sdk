import { ConnectionManager } from './ConnectionManager';
import { IRequest } from './IRequest';

export class PingRequest implements IRequest {
    private static initialized:boolean = false;
    private timer:any;
    constructor() {
        //empty
    }

    public static init() {
        if (PingRequest.initialized) {
            return;
        }
        
        new PingRequest().init();
        PingRequest.initialized = true;
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