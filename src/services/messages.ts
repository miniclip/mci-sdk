import { BaseService } from "../core/services";
import { Modules } from ".";
import { NetworkManager } from "../core/network";
import { PostRequest } from "../backend/PostRequest";
import { IPostPayload, IPostResponse } from "../backend/IPostMessage";
import { CallbackContainer } from "../utils/data"

export class MessagesService extends BaseService {

  private network:NetworkManager

  private listeners: CallbackContainer;
  private messageHandler: any;

  _boot() {
    this.network = this.container.get(Modules.NETWORK);
    this.listeners = new CallbackContainer();

    this.messageHandler = this.handler.bind(this);
  }

  /**
   * Send a realtime message to a certain player.
   * @param messageID string identifier for the message to be sent
   * @param recipientID player id to who the message will be sent
   * @param payload data to be sent with the message
   */
  public send(messageID: string, recipientID:string, payload:any = null):Promise<boolean> {
    return new Promise((resolve, reject) => {
      var message = new PostRequest(messageID, recipientID, new MessagePayloadWrapper(payload))
      
      this.network.ws.send(message).then(
        (data) => {
          resolve(true)
        },
        (err) => {
          reject(err);
        })
    })
  }

  /**
   * Add a listener for a certain messageID
   * @param messageID message identifier to listen for
   * @param callback Function to be called when messages with `messageID` are received
   */
  public listen(messageID:string, callback:Function) {
    if (!this.listeners.hasFor(messageID)){
      this.network.ws.registerPostHandler(messageID, this.messageHandler);
    }
    this.listeners.add(messageID, callback);
  }

  /**
   * Removes a listener for a certain messageID
   * @param messageID message identifier to stop listen for
   * @param callback The callback to stop calling
   */
  public unlisten(messageID:string, callback:Function ){
    this.listeners.remove(messageID, callback);
    if (!this.listeners.hasFor(messageID)){
      this.network.ws.unregisterPostHandler(messageID, this.messageHandler);
    }
  }

  private handler(message:IPostResponse<MessagePayloadWrapper>){
    let callbacks = this.listeners.get(message.id);
    if (callbacks == null) return;
    callbacks.forEach((c) => {
      c(message.id, message.payload.data);
    })
  }

}


class MessagePayloadWrapper implements IPostPayload {
  public okConfirmation:boolean;
  public requestID:string;
  public data:any = null;

  constructor(payload:any){
    this.data = payload;
  }
}