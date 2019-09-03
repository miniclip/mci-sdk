import 'mocha';

import { expect } from "chai";
import DIContainer from '../utils/dicontainer';
import { DummyNetworkManager, DummyServerComm } from "../core/tests/dummy_network";
import { Modules } from '.';
import { Store } from '../store';
import { LobbyService } from './lobby';
import { ResponseTypes } from '@/backend/ResponseTypes';
import * as sinon from "sinon";
import { EVENT_FRIEND_ONLINE } from '@/events';

describe('LobbyService', () => {

  const container: DIContainer = new DIContainer();

  const network = new DummyNetworkManager();
  const store = container.bind(Modules.GLOBAL_STORE, new Store());
  container.bind(Modules.NETWORK, network);
  var dummyWS:DummyServerComm;

  beforeEach(() => {
    network.clear();
    network.loopResponses = true;
    store.clear();

    dummyWS = new DummyServerComm()
    network.dummyWS = dummyWS  as DummyServerComm

    container.events.removeAllListeners();
  });

  it('listen for friend updates', async () => {
    
    const lobby = new LobbyService();
    lobby.setContainer(container)._boot();

    await dummyWS.connect()

    dummyWS.trigger(ResponseTypes.ONLINE_FRIENDS, { type: "online_friends ", friends: [] })

    const initialFriends = lobby.getOnlineFriends();
    expect(initialFriends).to.have.lengthOf(0);

    dummyWS.trigger(ResponseTypes.FRIEND_ONLINE, { type: "friend_online", player_id: "1"})
    
    const updatedFriends = lobby.getOnlineFriends();
    expect(updatedFriends).to.have.lengthOf(1);

    dummyWS.trigger(ResponseTypes.FRIEND_ONLINE, { type: "friend_online", player_id: "2"})

    const updatedFriends2 = lobby.getOnlineFriends();
    expect(updatedFriends).to.have.lengthOf(2);

    dummyWS.trigger(ResponseTypes.FRIEND_ONLINE, { type: "friend_online", player_id: "3"})

    const updatedFriends3 = lobby.getOnlineFriends();
    expect(updatedFriends).to.have.lengthOf(2, "Unknown friend should not be added!");
  })

  it('emits event when friend is online', async () => {
    
    var spy = sinon.spy();
    
    container.events.on(EVENT_FRIEND_ONLINE, spy);

    const lobby = new LobbyService();
    lobby.setContainer(container)._boot();

    await dummyWS.connect();

    dummyWS.trigger(ResponseTypes.FRIEND_ONLINE, { type: "friend_online", player_id: "1"})

    expect(spy.callCount).to.be.equal(1);
  })
})