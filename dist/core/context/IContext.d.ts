export interface IContext {
    getOtherPlayers(): Promise<Array<PlayerInfo>>;
}
export declare type PlayerInfo = {
    id: string;
    name: string;
    photo: string;
};
