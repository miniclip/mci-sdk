import "mocha";
import { assert, expect } from "chai";

import DIContainer from "../utils/dicontainer";
import { Modules } from "../services";
import { SessionService } from "../services/session";
import { Challenge } from "./challenge";
import { DummyNetworkManager } from "../core/network";

const now = Math.floor(new Date().getTime() / 1000);

const sample_invalid_challenge = {
  end_ts: now + 1000,
  score: { "2212873545391530": 5 }
};

const sample_valid_challenge = {
  end_ts: now + 1000,
  score: { "1": 10, "99999": 5 },
  context_id: "1233"
};

describe("ChallengeModel", function(){
  const container: DIContainer = new DIContainer();
  container.bind(Modules.SESSION, new SessionService());
  container.bind(Modules.NETWORK, new DummyNetworkManager());

  it("constructor", () => {
    const challenge = new Challenge(container, "1");

    expect(challenge.getPlayerScore()).to.be.NaN;
    expect(challenge.duration).to.be.greaterThan(0);
  });

  it("should not parse an invalid challenge", () => {
    const challenge = new Challenge(container, "1").parse(sample_invalid_challenge);

    expect(challenge).to.be.undefined;
  });

  it("should accept an valid challenge", () => {
    let challenge = new Challenge(container, "1").parse(sample_valid_challenge);

    expect(challenge).to.not.be.null;
    challenge = <Challenge>challenge;
    expect(challenge.getPlayerScore()).to.be.equal(10);
    expect(challenge.getOpponentId()).to.be.equal("99999");
    expect(challenge.getOpponentScore()).to.be.equal(5);
    
    expect(challenge.time_left).to.be.greaterThan(0);
    expect(challenge.contextId).to.be.equal(sample_valid_challenge['context_id']);
  });

  it("should generate valid tokens", () => {

    let initial_challenge = new Challenge(container, "1");
    initial_challenge.setScore(25);
    let original_data = initial_challenge.data;
    let token = initial_challenge.getShareToken();

    let new_challenge = new Challenge(container, "1");
    new_challenge.loadShareToken(token);

    console.log(new_challenge.data);
    console.log(original_data);
    expect(new_challenge.data).to.be.deep.equal(original_data);
  })
});
