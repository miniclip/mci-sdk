"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("@/utils/data");
class DummyNetworkManager {
    constructor() {
        this.loopResponses = false;
        this.responses = [];
        this.iterator = 0;
        this.dummyWS = new DummyServerComm();
    }
    createResponse(status, data) {
        return {
            data,
            status: status,
            statusText: "",
            headers: [],
            config: {}
        };
    }
    getNextResponse() {
        if (this.responses.length == 0) {
            throw new Error("No responses were set!");
        }
        if (this.iterator >= this.responses.length) {
            if (this.loopResponses) {
                this.iterator = 0;
            }
            else {
                throw new Error("Consumed all responses");
            }
        }
        return this.responses[this.iterator++];
    }
    addResponse(status, response = null) {
        let data = JSON.parse(JSON.stringify(response));
        this.responses.push({ status, data });
    }
    clear() {
        this.responses = [];
        this.iterator = 0;
    }
    get(url, config) {
        return new Promise((resolve) => {
            let { status, data } = this.getNextResponse();
            resolve(this.createResponse(status, data));
        });
    }
    post(url, data, config) {
        return new Promise((resolve) => {
            let { status, data } = this.getNextResponse();
            resolve(this.createResponse(status, data));
        });
    }
    put(url, data, config) {
        return new Promise((resolve) => {
            let { status, data } = this.getNextResponse();
            resolve(this.createResponse(status, data));
        });
    }
    delete(url, config) {
        return new Promise((resolve) => {
            let { status, data } = this.getNextResponse();
            resolve(this.createResponse(status, data));
        });
    }
    connect() {
        return Promise.resolve(true);
    }
    send(request) {
        return Promise.resolve(true);
    }
    getWS() {
        return this.dummyWS;
    }
}
exports.DummyNetworkManager = DummyNetworkManager;
class DummyServerComm {
    constructor() {
        this.onConnect = new data_1.Action();
        this.listeners = new data_1.CallbackContainer();
        this.postListeners = new data_1.CallbackContainer();
    }
    connect() {
        this.onConnect.emit();
        return Promise.resolve(true);
    }
    send(request) {
        return Promise.resolve(true);
    }
    registerHandler(type, callback) {
        this.listeners.add(type, callback);
    }
    unregisterHandler(type, callback) {
        this.listeners.remove(type, callback);
    }
    registerPostHandler(type, callback) {
        this.postListeners.add(type, callback);
    }
    unregisterPostHandler(type, callback) {
        this.postListeners.remove(type, callback);
    }
    triggerPost(type, id, sender_id, payload) {
        const list = this.postListeners.get(type);
        const message = {
            type: 'post',
            id, sender_id, payload
        };
        list.forEach((c) => {
            c(message);
        });
    }
    trigger(type, payload) {
        const list = this.listeners.get(type);
        list.forEach((c) => {
            c(payload);
        });
    }
}
exports.DummyServerComm = DummyServerComm;
