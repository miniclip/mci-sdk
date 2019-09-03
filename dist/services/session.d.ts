import { BaseService } from "@/core/services";
export interface ISessionService {
    setData(params: Object): void;
    setPublicState(data: Object): void;
    syncSession(): void;
}
export declare class SessionService extends BaseService {
    private static PAYLOAD_NS;
    private internalState;
    private publicState;
    private _publicSession;
    private timezoneOffset;
    constructor();
    getPublicSession(): PublicSession;
    setPublicState(data: any): void;
    reset(): void;
    setData(params: Object): void;
    syncSession(): void;
    private mergeData;
}
export declare class PublicSession {
    private _session;
    constructor(session: SessionService);
    set(obj: any): void;
}
