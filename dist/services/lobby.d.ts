import { BaseService } from "../core/services";
import { OnlinePlayerInfo } from "src/core/context/IContext";
export declare class LobbyService extends BaseService {
    private network;
    private connectedFriends;
    private onlineFriends;
    _boot(): void;
    getOnlineFriends(): Array<OnlinePlayerInfo>;
    private onWSConnect;
    private onFriendOnline;
    private addOnlineFriend;
    private updateOnlineFriends;
}
