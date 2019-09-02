import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios';
import { Store } from '../store';
import DIContainer from '../utils/dicontainer';
import { Modules } from '../services';
import { ServerCommsManager } from '../backend/ServerCommsManager';
import { Socket } from '../backend/Socket';

const axiosRetry = require('axios-retry');
const { isNetworkOrIdempotentRequestError } = require('axios-retry');

const AUTH_TOKEY_KEY = "auth-token";

const HEADER_AUTH_TOKEN = "x-auth-token";
const HEADER_FB_SIGNATURE = "x-fb-signature";

export interface INetworkManager {
    get<T>(url:string, config?: AxiosRequestConfig ):AxiosPromise<T>;
    post<T>(url:string, data?:any, config?: AxiosRequestConfig ):AxiosPromise<T>
    put<T>(url:string, data?:any, config?:AxiosRequestConfig):AxiosPromise<T>
    delete<T>(url:string, config?:AxiosRequestConfig):AxiosPromise<T>
}

export class DummyNetworkManager implements INetworkManager {

    public loopResponses:boolean = false;
    public responses:any[] = [];
    private iterator = 0;

    private createResponse(status:number, data:number){
        return {
            data,
            status: status,
            statusText: "",
            headers: [],
            config: {}
        }
    }

    private getNextResponse(){
        if (this.responses.length == 0) {
            throw new Error("No responses were set!");
        }

        if (this.iterator >= this.responses.length){
            if (this.loopResponses){
                this.iterator = 0;
            } else {
                throw new Error("Consumed all responses")
            }
        }

        return this.responses[this.iterator++];
    }

    public addResponse(status:number, response:any = null){
        let data = JSON.parse(JSON.stringify(response))
        this.responses.push({ status, data });
    }

    public clear(){
        this.responses = [];
        this.iterator = 0;
    }

    public get(url:string, config?:AxiosRequestConfig){
        return new Promise<AxiosResponse>((resolve) => {
            let {status, data} = this.getNextResponse();
            resolve(this.createResponse(status, data));
        })
    }

    public post(url:string, data?:any, config?:AxiosRequestConfig){
        return new Promise<AxiosResponse>((resolve) => {
            let {status, data} = this.getNextResponse();
            resolve(this.createResponse(status, data));
        })
    }

    public put(url:string, data?:any, config?:AxiosRequestConfig){
        return new Promise<AxiosResponse>((resolve) => {
            let {status, data} = this.getNextResponse();
            resolve(this.createResponse(status, data));
        })
    }

    public delete(url:string, config?:AxiosRequestConfig){
        return new Promise<AxiosResponse>((resolve) => {
            let {status, data} = this.getNextResponse();
            resolve(this.createResponse(status, data));
        })
    }
}

export class NetworkManager implements INetworkManager {

    private axios:AxiosInstance;
    private store:Store;

    private serverComm:ServerCommsManager

    constructor({
        environment = "production",
        container,
        app_id
    }: NetworkOptions) {
        this.store = container.get(Modules.GLOBAL_STORE);

        this.axios = axios.create({
            baseURL: this.getAPIEndpointURL(environment, app_id)
        })

        this.axios.interceptors.request.use(config => {
            config.headers['Content-Type'] = 'application/json';
            
            return new Promise((resolve) => {
                if (this.store.get(AUTH_TOKEY_KEY)){
                    config.headers[HEADER_AUTH_TOKEN] = this.store.get(AUTH_TOKEY_KEY);

                    resolve(config);
                } else {
                    this.getSignedMessage().then((result) => {
                        config.headers[HEADER_FB_SIGNATURE] = result.getSignature();

                        resolve(config);
                    }).catch(()=>{
                        resolve(config);
                    });
                }
            })
            
        })

        this.axios.interceptors.response.use( (response:AxiosResponse) => {
            let status = response.status;

            if ( (status >= 200 && status <= 299)){
                const authToken = response.headers[HEADER_AUTH_TOKEN];
                if (authToken){
                    this.store.set(AUTH_TOKEY_KEY, authToken);
                }
            }

            return response;

        }, async (error) => {
            if (error.response && error.response.status == 401){
                this.store.set(AUTH_TOKEY_KEY, null);

                // reauthenticate
                try {
                    let result = await this.getSignedMessage();

                    error.config.headers[HEADER_FB_SIGNATURE] = result.getSignature();
                    //error.config['axios-retry']['retryCount'] = Math.max(0, error.config['axios-retry']['retryCount']-1); 
                } catch( err ){
                    console.error("failed to sign request", err);
                }
            }

            throw error;
        });

        axiosRetry(this.axios, {
            retries: 3,
            retryCondition: (error:any) => {
                return isNetworkOrIdempotentRequestError(error) || error.response.status == 401;
            },
            retryDelay: (retryCount:number) => {
                return retryCount * 500;
            }
        })

        this.serverComm = new ServerCommsManager(""+app_id, new Socket(this.getWSEndpointURL(environment)));
    }

    public get ws():ServerCommsManager { return this.serverComm; }

    public get(url:string, config?: AxiosRequestConfig ){
        return this.axios.get(url, config);
    }

    public post(url:string, data?:any, config?: AxiosRequestConfig ){
        return this.axios.post(url, data, config);
    }

    public put(url:string, data?:any, config?: AxiosRequestConfig ){
        return this.axios.put(url, data, config);
    }

    public delete(url:string, config?: AxiosRequestConfig ){
        return this.axios.delete(url, config);
    }

    private getSignedMessage():Promise<FBInstant.SignedPlayerInfo>{
        return FBInstant.player.getSignedPlayerInfoAsync();
    }

    private getAPIEndpointURL(environment:string, app_id:string){
        var baseurl = "";
        switch(environment){
            case "development": baseurl = "dev-mci-ws"; break;
            case "sandbox": baseurl = "sandbox-mci-ws"; break;
            default:
            baseurl = "prod-mci-ws";
        }
        return `https://${baseurl}.miniclippt.com/apps/${app_id}`;
    }

    private getWSEndpointURL(environment:string){
        var baseurl = "";
        switch(environment){
            case "development": baseurl = "dev"; break;
            default:
            baseurl = "prod";
        }
        return `wss://${baseurl}-mci-os.miniclippt.com/ws`;
    }
}

export interface NetworkOptions {
    environment?:string
    container:DIContainer
    app_id: string
} 