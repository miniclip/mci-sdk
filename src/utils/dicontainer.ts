import { Logger, getLogger } from "../logger";
import { EventEmitter } from "./eventemitter";
import { BaseService } from "../core/services";

export default class DIContainer {
    private modules: { [id:string]: any} = {};

    private logger:Logger;
    public events:EventEmitter;

    constructor(){
        this.logger = getLogger("dicontainer");
        this.events = new EventEmitter();
    }

    bind(module_name:string, instance:any){
        this.modules[module_name] = instance;

        if (instance instanceof BaseService){
            instance.container = this;
        }

        return instance;
    }

    get(module_name:string){
        if (module_name in this.modules){
            return this.modules[module_name];
        }

        throw new Error(`Failed to get ${module_name} module`)
    }

    boot(){
        const services = Object.keys(this.modules);
        services.forEach((name) => {
            let instance = this.modules[name];
            if (instance instanceof BaseService){
                instance._boot();
            }
        });
    }
}