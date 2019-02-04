import { AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios';
import DIContainer from '../utils/dicontainer';
export interface INetworkManager {
    get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}
export declare class DummyNetworkManager implements INetworkManager {
    loopResponses: boolean;
    responses: any[];
    private iterator;
    private createResponse;
    private getNextResponse;
    addResponse(status: number, response?: any): void;
    clear(): void;
    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    put(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>>;
}
export declare class NetworkManager implements INetworkManager {
    private axios;
    private store;
    constructor({ endpointURL, container }: NetworkOptions);
    get(url: string, config?: AxiosRequestConfig): AxiosPromise<any>;
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<any>;
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<any>;
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise<any>;
    private getSignedMessage;
}
export interface NetworkOptions {
    endpointURL?: string;
    container: DIContainer;
}
