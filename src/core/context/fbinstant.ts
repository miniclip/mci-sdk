import { IContext, PlayerInfo } from "./IContext";

export default class FBContext implements IContext{

  public getCurrentPlayer():Promise<PlayerInfo> {
    return new Promise((resolve, reject) => {
      var player:PlayerInfo = {
        id: FBInstant.player.getID(),
        name: FBInstant.player.getName(),
        photo: FBInstant.player.getPhoto()
      };
      resolve(player);
    })
  }
  
  /**
   * Get other players in same context, and filter self.
   */
  public getOtherPlayers():Promise<Array<PlayerInfo>> {
    return new Promise((resolve, reject) => {
      let promises = new Array();
      promises.push(this.getCurrentPlayer());
      promises.push(FBInstant.context.getPlayersAsync());

      Promise.all(promises).then((results)=>{
        let currentPlayer:PlayerInfo = results[0];
        let players:FBInstant.ContextPlayer[] = results[1];

        var filteredPlayers:PlayerInfo[] = [];
        players.forEach((p) => {

          if (currentPlayer.id == p.getID()) return;
          
          filteredPlayers.push({
            id: p.getID(),
            name: p.getName(),
            photo: p.getPhoto()
          })
        })

        resolve(filteredPlayers);
      }, () => {
        resolve([]);
      })
    })
  }

  public getFriends():Promise<Array<PlayerInfo>> {
    return new Promise((resolve, reject) =>{
      FBInstant.player.getConnectedPlayersAsync().then(
        (players) => {
          var friends = players.map((p) => {
            return {
              id: p.getID(),
              name: p.getName(),
              photo: p.getPhoto()
            }
          })
          resolve(friends);
        },
        (e) => {
          resolve([]);
        }
      )
    });
  }

}