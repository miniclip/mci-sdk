const initialState = {
    authtoken: undefined
}

export interface IDataStore {
    get(key:string, def_value?:any):any;
    set(key:string, value:any):void;
    clear():void;
}

export class Store implements IDataStore {
    private state:any;
    private initial:any;

    constructor(initial:any = {}){
        this.initial = initial;
        this.clear();
    }

    get(key:string, def_value?:any){
        return this.state.hasOwnProperty(key) ? this.state[key] : def_value;
    }

    set(key:string, value:any){
        this.state[key] = value;
    }

    clear(){
        this.state = this.initial;
    }
}

//export default new Store(initialState);