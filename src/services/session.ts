import { Challenge } from "../models";
import { ChallengeType } from "../models/Challenge";
import { BaseService } from "../core/services";

export interface ISessionService {
  setData(params: Object): void;
  setPublicState(data: Object): void;
  syncSession(): void;
}

export class SessionService extends BaseService {
  private static PAYLOAD_NS: string = "mc:sessionPayload";

  private internalState: any = {};
  private publicState: any = {};

  private _publicSession: PublicSession;

  private timezoneOffset: number;

  constructor() {
    super();

    this._publicSession = new PublicSession(this);
    this.timezoneOffset = new Date().getTimezoneOffset();

    this.syncSession();
  }

  getPublicSession() {
    return this._publicSession;
  }

  setPublicState(data: any) {
    this.publicState = data;
  }

  reset() {
    this.internalState = {};
  }

  setData(params: Object) {
    this.mergeData(this.internalState, params);
    this.syncSession();
  }

  syncSession() {
    let base = {
      ...this.publicState
    };
    base[SessionService.PAYLOAD_NS] = this.internalState;

    const name = FBInstant.player.getName();
    const avatar = FBInstant.player.getPhoto();

    base["_mc"] = { timezone_offset: this.timezoneOffset, name, avatar };
    FBInstant.setSessionData(base);
  }

  private mergeData(target: Object, obj: Object) {
    let keys = Object.keys(obj);
    keys.forEach(key => {
      target[key] = obj[key];
    });
  }
}

export class PublicSession {
  private _session: SessionService;

  constructor(session: SessionService) {
    this._session = session;
  }

  set(obj: any) {
    this._session.setPublicState(obj);
    this._session.syncSession();
  }
}
