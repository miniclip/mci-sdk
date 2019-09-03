import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosPromise } from 'axios';
import { INetworkManager } from '../network';
import { IServerCommManager } from 'src/backend/ServerCommsManager';
import { IRequest } from '@/backend/IRequest';
import { ResponseTypes } from '@/backend/ResponseTypes';
import { IPostResponse } from '@/backend/IPostMessage';
import { CallbackContainer, Action } from '@/utils/data';

export class DummyNetworkManager implements INetworkManager {

  public loopResponses:boolean = false;
  public responses:any[] = [];
  private iterator = 0;

  public dummyWS:IServerCommManager;

  constructor(){
      this.dummyWS = new DummyServerComm();
  }

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

  public connect():Promise<any>{
      return Promise.resolve(true);
  }

  public send(request:IRequest):Promise<any> {
      return Promise.resolve(true);
  }

  public getWS():IServerCommManager {
      return this.dummyWS;
  }
}

export class DummyServerComm implements IServerCommManager {
  
    listeners:CallbackContainer;
    postListeners:CallbackContainer;

    public onConnect:Action = new Action();

    constructor(){
        this.listeners = new CallbackContainer();
        this.postListeners = new CallbackContainer();
    }

    public connect():Promise<any> {
        this.onConnect.emit();
        return Promise.resolve(true);
    }

    public send(request:IRequest):Promise<any> {
        return Promise.resolve(true);
    }

    registerHandler(type:ResponseTypes, callback:(data:any) => void):void {
        this.listeners.add(type, callback);
    }

    unregisterHandler(type:ResponseTypes, callback:(data:any) => void):void {
        this.listeners.remove(type, callback);
    }

    registerPostHandler(type:string, callback:(data:IPostResponse) => void):void {
        this.postListeners.add(type, callback)
    }

    unregisterPostHandler(type:string, callback:(data:IPostResponse) => void):void {
        this.postListeners.remove(type, callback);
    }

    triggerPost( type:string, id: string, sender_id: string, payload:any) {
        const list = this.postListeners.get(type)

        const message = { 
            type:'post',
            id, sender_id, payload
        }

        list.forEach((c) => {
            c(message);
        })
    }

    trigger( type:ResponseTypes, payload:any ){
        const list = this.listeners.get(type)

        list.forEach((c) => {
            c(payload);
        })
    }
}