export interface IContext {
    getOtherPlayers(): Promise<Array<PlayerInfo>>;
    getFriends(): Promise<Array<PlayerInfo>>;
}
export declare type PlayerInfo = {
    id: string;
    name: string;
    photo: string;
};
export declare type OnlinePlayerInfo = {
    id: string;
    name: string;
    photo: string;
    updated_at: number;
};
