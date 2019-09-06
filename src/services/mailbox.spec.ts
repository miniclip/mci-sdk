import 'mocha';

import { expect } from "chai";
import DIContainer from "../utils/dicontainer";
import { Modules } from ".";
import { MailboxService } from './mailbox';
import { DummyNetworkManager } from "../core/tests/dummy_network";

describe('MailboxService', () => {
    const container: DIContainer = new DIContainer();
    const network = new DummyNetworkManager();
    container.bind(Modules.NETWORK, network);

    beforeEach(() => {
    })

    it("send a message", async () => {
        network.addResponse(200, 'ok');

        const mailbox = new MailboxService();
        mailbox.setContainer(container)._boot();

        const result = await <any>mailbox.send('test message', '1');
        expect(result.data).equal('ok');
    })

});