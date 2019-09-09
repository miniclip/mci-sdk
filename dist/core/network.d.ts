import { AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios';
import DIContainer from '../utils/dicontainer';
import { IServerCommManager } from '../backend/ServerCommsManager';
import { IRequest } from 'src/backend/IRequest';
export interface INetworkManager {
    get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    send(request: IRequest): Promise<any>;
    connect(): Promise<any>;
    getWS(): IServerCommManager;
}
export declare class NetworkManager implements INetworkManager {
    private axios;
    private store;
    private serverComm;
    constructor({ environment, container, app_id }: NetworkOptions);
    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    put(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    send(request: IRequest): Promise<any>;
    connect(): Promise<any>;
    getWS(): IServerCommManager;
    private getSignedMessage;
    private getAPIEndpointURL;
    private getWSEndpointURL;
}
export interface NetworkOptions {
    environment?: string;
    container: DIContainer;
    app_id: string;
}
