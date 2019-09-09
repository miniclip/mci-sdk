import 'mocha';
import { expect } from "chai";
import DIContainer from "../utils/dicontainer";
import { Modules } from ".";
import { MailboxService } from './mailbox';
import { DummyNetworkManager } from "../core/tests/dummy_network";

const dummy_data = [
    {sender_id: "1", timestamp: 1568041200, message: "first"},
    {sender_id: "1", timestamp: 1568041200, message: "second"},
    {sender_id: "1", timestamp: 1568041200, message: 3},
];

describe('MailboxService', () => {
    const container: DIContainer = new DIContainer();
    const network = new DummyNetworkManager();
    container.bind(Modules.NETWORK, network);

    beforeEach(() => {
        network.clear();
        network.loopResponses = true;

        container.events.removeAllListeners();
    });

    it("send a message", async () => {
        network.addResponse(200, 'ok');

        const mailbox = new MailboxService();
        mailbox.setContainer(container)._boot();

        const result = await <any>mailbox.send('3222935531065574', ['test message']);
        expect(result.data).equal('ok');
    })

    it("send and receive a 'test' message", async () => {
        network.addResponse(200, 'ok');

        const mailbox = new MailboxService();
        mailbox.setContainer(container)._boot();

        const result = await <any>mailbox.send('1', ['test']);
        expect(result.data).equal('ok');

        const message:String = 'test';
        network.addResponse(200, [message]);

        const inbox = await <any>mailbox.read();
        expect(inbox.data.length).equal(1)
        expect(inbox.data[0]).equal('test')
    })

    it("send and receive several messages", async () => {
        network.addResponse(200, 'ok');

        const mailbox = new MailboxService();
        mailbox.setContainer(container)._boot();

        const messages = ['first', 'second', 3];
        const result = await <any>mailbox.send('1', messages);
        expect(result.data).equal('ok');

        network.addResponse(200, dummy_data);

        const inbox = await <any>mailbox.read();
        expect(inbox.data.length).equal(3);
        expect(inbox.data[0].message).equal('first');
        expect(inbox.data[1].message).equal('second');
        expect(inbox.data[2].message).equal(3);
    })

});