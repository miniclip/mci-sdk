export interface IContext {
  getOtherPlayers():Promise<Array<PlayerInfo>>
  getFriends():Promise<Array<PlayerInfo>>
}

export type PlayerInfo = {
  id: string;
  name: string;
  photo: string;
}

export type OnlinePlayerInfo = {
  id: string;
  name: string;
  photo: string;
  updated_at: number;
}