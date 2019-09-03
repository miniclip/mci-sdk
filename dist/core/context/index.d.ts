import { IContext, PlayerInfo } from "./IContext";
export declare class MCContext implements IContext {
    private _handler;
    constructor(handler: IContext);
    getOtherPlayers(): Promise<Array<PlayerInfo>>;
    getFriends(): Promise<Array<PlayerInfo>>;
}
declare const _instance: MCContext;
export default _instance;
