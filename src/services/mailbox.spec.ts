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

        const result = await <any>mailbox.send('3222935531065574', 'test message');
        expect(result.data).equal('ok');
    })

    it("send and receive a 'test' message", async () => {
        network.addResponse(200, 'ok');

        const mailbox = new MailboxService();
        mailbox.setContainer(container)._boot();

        const result = await <any>mailbox.send('1', 'test');
        expect(result.data).equal('ok');

        const message:String = 'test';
        network.addResponse(200, [message]);

        const inbox = await <any>mailbox.read();
        expect(inbox.data.length).equal(1)
        expect(inbox.data[0]).equal('test')
    })

});