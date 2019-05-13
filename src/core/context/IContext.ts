export interface IContext {
  getOtherPlayers():Promise<Array<PlayerInfo>>
}

export type PlayerInfo = {
  id: string;
  name: string;
  photo: string;
}