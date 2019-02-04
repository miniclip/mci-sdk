/// <reference types="node" />
import DIContainer from "../utils/dicontainer";
export declare class BaseService {
    container: DIContainer;
    constructor();
    _boot(): void;
    setContainer(container: DIContainer): this;
    protected readonly events: import("events").EventEmitter;
}
