import FBContext from "./fbinstant";
import { IContext, PlayerInfo } from "./IContext";

export class MCContext implements IContext {
  private _handler:IContext;
  
  constructor(handler:IContext){
    this._handler = handler;
  }

  public getOtherPlayers():Promise<Array<PlayerInfo>> {
    return this._handler.getOtherPlayers();
  }
}

var handler = new FBContext();

const _instance = new MCContext(handler)
export default _instance;