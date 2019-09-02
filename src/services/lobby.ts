import { BaseService } from "../core/services";
import { Modules } from ".";
import { EVENT_WS_CONNECTED, EVENT_FRIEND_ONLINE } from "../events";
import { NetworkManager } from "../core/network";
import MCContext from "../core/context";
import { OnlineFriendsRequest } from "../backend/OnlineFriendsRequest";
import { ResponseTypes } from "../backend/ResponseTypes";
import { PlayerInfo, OnlinePlayerInfo } from "src/core/context/IContext";

export class LobbyService extends BaseService {

  private network:NetworkManager;

  private connectedFriends:Array<PlayerInfo> = [];
  private onlineFriends:Array<OnlinePlayerInfo> = [];

  _boot(){
    this.events.on(EVENT_WS_CONNECTED, this.onWSConnect.bind(this))
    this.network = this.container.get(Modules.NETWORK);

    this.network.ws.registerHandler(ResponseTypes.FRIEND_ONLINE, this.onFriendOnline.bind(this))
  }

  /**
   * Get the list of friends that are possibly online
   */
  public getOnlineFriends():Array<OnlinePlayerInfo>{
    return this.onlineFriends;
  }

  private onWSConnect(){
    this.updateOnlineFriends();
  }

  private onFriendOnline(data: { type: string, player_id: string}){
    console.log(data);
    if (data.type != "friend_online") return;

    this.addOnlineFriend(data.player_id)
    
  }

  private addOnlineFriend(player_id:string, emitEvent:boolean = true){
    const friendInfo = this.connectedFriends.find((p) => p.id == player_id);
    if (friendInfo == null) return;

    let friendIdx = this.onlineFriends.findIndex((p) => p.id == player_id);
    let friend;
    if (friendIdx == -1) {
      friend = {
        id: player_id,
        name: friendInfo.name,
        photo: friendInfo.photo,
        updated_at: new Date().getTime()
      }
      this.onlineFriends.push(friend)
    } else {
      friend = this.onlineFriends[friendIdx];
      friend.updated_at = new Date().getTime();
      this.onlineFriends[friendIdx] = friend;
    }

    if (emitEvent){
      this.events.emit(EVENT_FRIEND_ONLINE, friend);
    }
  }

  private async updateOnlineFriends(){
    const friends:string[] = [];

    this.connectedFriends = await MCContext.getFriends();
    (this.connectedFriends).forEach((p) => {
      friends.push(p.id);
    })

    this.network.ws.registerHandler(ResponseTypes.ONLINE_FRIENDS, (onlineData: {friends:Array<any>, type:string }) => {
      if (onlineData.type != "online_friends") return;

      onlineData.friends.forEach((fid:string) => {
        this.addOnlineFriend(fid, false)
      })
    })
    this.network.ws.send(new OnlineFriendsRequest(friends));
  }

}
