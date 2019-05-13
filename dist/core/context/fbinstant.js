"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FBContext {
    getCurrentPlayer() {
        return new Promise((resolve, reject) => {
            var player = {
                id: FBInstant.player.getID(),
                name: FBInstant.player.getName(),
                photo: FBInstant.player.getPhoto()
            };
            resolve(player);
        });
    }
    getOtherPlayers() {
        return new Promise((resolve, reject) => {
            let promises = new Array();
            promises.push(this.getCurrentPlayer());
            promises.push(FBInstant.context.getPlayersAsync());
            Promise.all(promises).then((results) => {
                let currentPlayer = results[0];
                let players = results[1];
                var filteredPlayers = [];
                players.forEach((p) => {
                    if (currentPlayer.id == p.getID())
                        return;
                    filteredPlayers.push({
                        id: p.getID(),
                        name: p.getName(),
                        photo: p.getPhoto()
                    });
                });
                resolve(filteredPlayers);
            });
        });
    }
}
exports.default = FBContext;
