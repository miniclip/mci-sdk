import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { INetworkManager } from '../network';
import { IServerCommManager } from 'src/backend/ServerCommsManager';
import { IRequest } from '@/backend/IRequest';
import { ResponseTypes } from '@/backend/ResponseTypes';
import { IPostResponse } from '@/backend/IPostMessage';
import { CallbackContainer, Action } from '@/utils/data';
export declare class DummyNetworkManager implements INetworkManager {
    loopResponses: boolean;
    responses: any[];
    private iterator;
    dummyWS: IServerCommManager;
    constructor();
    private createResponse;
    private getNextResponse;
    addResponse(status: number, response?: any): void;
    clear(): void;
    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    put(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    connect(): Promise<any>;
    send(request: IRequest): Promise<any>;
    getWS(): IServerCommManager;
}
export declare class DummyServerComm implements IServerCommManager {
    listeners: CallbackContainer;
    postListeners: CallbackContainer;
    onConnect: Action;
    constructor();
    connect(): Promise<any>;
    send(request: IRequest): Promise<any>;
    registerHandler(type: ResponseTypes, callback: (data: any) => void): void;
    unregisterHandler(type: ResponseTypes, callback: (data: any) => void): void;
    registerPostHandler(type: string, callback: (data: IPostResponse) => void): void;
    unregisterPostHandler(type: string, callback: (data: IPostResponse) => void): void;
    triggerPost(type: string, id: string, sender_id: string, payload: any): void;
    trigger(type: ResponseTypes, payload: any): void;
}
