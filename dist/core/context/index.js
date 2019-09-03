"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fbinstant_1 = require("./fbinstant");
class MCContext {
    constructor(handler) {
        this._handler = handler;
    }
    getOtherPlayers() {
        return this._handler.getOtherPlayers();
    }
    getFriends() {
        return this._handler.getFriends();
    }
}
exports.MCContext = MCContext;
var handler = new fbinstant_1.default();
const _instance = new MCContext(handler);
exports.default = _instance;
