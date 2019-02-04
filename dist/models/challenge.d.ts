import DIContainer from "../utils/dicontainer";
export declare type ChallengeType = {
    type: string;
    duration: number;
    score: {
        [id: string]: number;
    };
    context_id: string;
    end_ts: number;
    version?: number;
};
export declare class Challenge {
    private _session;
    private _currentPlayer;
    private _originalScore;
    private _data;
    constructor(container: DIContainer, current_player_id: string);
    parse(data: any): Challenge | undefined;
    setScore(score: number): this;
    setDuration(duration: number): this;
    setContext(context_id: string): this;
    hasScore(player_id: string | undefined): boolean;
    getScore(player_id: string | undefined): number;
    getPlayerId(): string;
    getPlayerScore(): number;
    playerHasScore(): boolean;
    getOpponentId(): string | undefined;
    getOpponentScore(): number;
    opponentHasScore(): boolean;
    readonly playerIds: string[];
    readonly duration: number;
    readonly time_left: number;
    readonly expired: boolean;
    readonly contextId: string;
    readonly data: ChallengeType;
    getShareToken(): string;
    loadShareToken(token: string | any): boolean;
    save(): boolean;
    toJSON(): string;
}
