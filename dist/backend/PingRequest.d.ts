import { IRequest } from './IRequest';
import { ISocket } from './ISocket';
export declare class PingRequest implements IRequest {
    private timer;
    private delay;
    constructor(delay?: number);
    send(socket: ISocket): Promise<void>;
    stop(): void;
}
