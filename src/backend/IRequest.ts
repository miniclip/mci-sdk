import { ISocket } from './ISocket';

export interface IRequest {
    send(webSocket:ISocket):Promise<any>;
}
