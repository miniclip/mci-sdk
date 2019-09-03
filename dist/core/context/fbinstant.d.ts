import { IContext, PlayerInfo } from "./IContext";
export default class FBContext implements IContext {
    getCurrentPlayer(): Promise<PlayerInfo>;
    getOtherPlayers(): Promise<Array<PlayerInfo>>;
    getFriends(): Promise<Array<PlayerInfo>>;
}
