import { EventEmitter } from "./eventemitter";
export default class DIContainer {
    private modules;
    private logger;
    events: EventEmitter;
    constructor();
    bind(module_name: string, instance: any): any;
    get(module_name: string): any;
    boot(): void;
}
