import "mocha";
import DIContainer from "../utils/dicontainer";
import { Modules } from ".";
import { DummyNetworkManager } from "../core/network";
import { ChallengeService } from "./challenges";

import { assert, expect } from "chai";
import * as sinon from "sinon";
import { SessionService } from "./session";

import { EVENT_CHALLENGE_ENDED } from "../events";
import { WalletService } from "./wallet";
import { Store } from "../store";
import { Challenge } from "../models";

const now = Math.floor(new Date().getTime() / 1000);

const dummyData_1 = [
  {
    end_ts: now + 1000,
    score: { "2212873545391530": 5 },
    context_id: "context_1",
    challenge_id: "c1"
  },
  {
    end_ts: now + 1000,
    score: { "2212873545391530": 5, "2212873545391531": 10 },
    context_id: "context_2",
    challenge_id: "c2"
  },
  {
    score: { "1": 25, "2212873545391531": 10 },
    context_id: "context_3",
    challenge_id: "c3"
  }
];

const dummyData_2 = [
  {
    end_ts: now + 1000,
    score: { "2212873545391530": 5 },
    context_id: "1966092683437358"
  },
  {
    end_ts: now + 1000,
    score: { "2212873545391530": 5, "2212873545391531": 10 }
  }
];

const expired_data = [
  {
    end_ts: now + 1000,
    score: { "2212873545391530": 5 },
    context_id: "1966092683437358"
  },
  {
    end_ts: now - 1000,
    score: { "1": 5, "2": 10 },
    context_id: "122"
  },
  {
    end_ts: now - 1000,
    score: { "1": 20, "2": 10 },
    context_id: "123"
  }
];

describe("ChallengeService", function() {
  const container: DIContainer = new DIContainer();

  const stubWallet = sinon.createStubInstance(WalletService);
  stubWallet.addBalance.returns(Promise.resolve(true));

  const network = new DummyNetworkManager();
  const store = container.bind(Modules.GLOBAL_STORE, new Store());
  container.bind(Modules.NETWORK, network);
  container.bind(Modules.WALLET, stubWallet);
  container.bind(Modules.SESSION, new SessionService());

  beforeEach(() => {
    network.clear();
    network.loopResponses = true;
    store.clear();

    container.events.removeAllListeners();
  });

  it("return a list of Challenges", () => {
    network.addResponse(200, dummyData_1);

    const challengeService = new ChallengeService();
    challengeService.setContainer(container)._boot();

    challengeService.updateList().then(challenges => {
      expect(challenges).length(3);

      let firstChallenge = challenges[0];
      expect(challenges[0].getScore("2212873545391530")).equal(5);
      expect(challenges[1].getScore("2212873545391531")).equal(10);

      expect(challenges[0].getPlayerScore()).to.be.NaN;

      expect(challenges[2].getPlayerScore()).equal(25);
    });
  });

  it("should filter out invalid Challenges", () => {
    network.addResponse(200, dummyData_2);

    const challengeService = new ChallengeService();
    challengeService.setContainer(container)._boot();

    challengeService.updateList().then(challenges => {
      expect(challenges).length(1);
    });
  });

  it("should clear up completed challenges", () => {
    network.addResponse(200, expired_data);
    network.addResponse(200);
    network.addResponse(200);

    const challengeService = new ChallengeService();
    challengeService.setContainer(container)._boot();

    challengeService.getAll().then(challenges => {
      expect(challenges.length).to.be.equal(1);
    });
  });

  it("should emit challenge completed events with correct status", () => {
    store.set("challenge_reward", { value: 50, currency: "coins" });
    network.addResponse(200, expired_data);
    network.addResponse(200);
    network.addResponse(200);

    var spy = sinon.spy();

    container.events.on(EVENT_CHALLENGE_ENDED, spy);

    const challengeService = new ChallengeService();
    challengeService.setContainer(container)._boot();

    challengeService.updateList().then(() => {
      expect(spy.callCount).to.be.equal(2);
      expect(spy.firstCall.args[0]).to.have.property("challenge");
      expect(spy.firstCall.args[0]).to.deep.include({
        won: false,
        reward: { value: 50, currency: "coins" }
      });
      expect(spy.callCount).to.be.equal(2);
    });
  });

  it("should return challenge from list if available", () => {
    network.addResponse(200, dummyData_1);

    const challengeService = new ChallengeService();
    challengeService.setContainer(container)._boot();

    let c1 = new Challenge(container, "1")
      .setScore(20)
      .setChallengeId("c3")
      .getShareToken();

    challengeService.getFromToken(c1).then((challenge) => {
      challenge = <Challenge>challenge;
      expect(challenge).to.be.not.undefined;
      expect(challenge.getPlayerScore()).to.be.equal(25);
    });
    
  });

  it("should should load from token challenge", () => {
    network.addResponse(200, dummyData_1);

    const challengeService = new ChallengeService();
    challengeService.setContainer(container)._boot();

    let c1 = new Challenge(container, "1")
      .setScore(20)
      .setContext("context_4")
      .getShareToken();

    challengeService.getFromToken(c1).then((challenge) => {
      challenge = <Challenge>challenge;
      expect(challenge).to.be.not.undefined;
      expect(challenge.getPlayerScore()).to.be.equal(20);
      expect(challenge.contextId).to.be.equal("context_4");
    });
    
  });
});
