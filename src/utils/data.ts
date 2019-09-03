
export class CallbackContainer {

  private callbacks: { [id:string]:Array<Function> } = {}

  public add(identifier:string, callback:Function){
    if (!(identifier in this.callbacks)){
      this.callbacks[identifier] = [];
    }

    let idx = this.callbacks[identifier].findIndex((c) => c == callback);
    if (idx != -1) return;

    this.callbacks[identifier].push(callback);
  }

  public hasFor(identifier:string){
    return identifier in this.callbacks;
  }

  public get(identifier:string){
    if (!this.hasFor(identifier)) return [];
    return this.callbacks[identifier];
  }

  public remove(identifier:string, callback:Function){
    if (!(identifier in this.callbacks)) return;

    let idx = this.callbacks[identifier].findIndex((c) => c == callback);
    if (idx == -1) return;
    this.callbacks[identifier].splice(idx, 1);

    if (this.callbacks[identifier].length == 0){
      delete this.callbacks[identifier];
    }
  }
}

export class Action {
  private listeners:Array<() => void> = [];

  public emit(){
    this.listeners.forEach((l) => {
      l();
    })
  }

  public listen(callback: () => void){
    let idx = this.listeners.findIndex((c) => c == callback);
    if (idx != -1) return;

    this.listeners.push(callback);
  }

  public unlisten(callback: () => void){
    let idx = this.listeners.findIndex((c) => c == callback);
    if (idx == -1) return;

    this.listeners.splice(idx, 1);
  }

  public clear(){
    this.listeners = [];
  }
}


export class Action1<T> {
  private listeners:Array<(arg0: T) => void> = [];

  public emit(arg0:T){
    this.listeners.forEach((l) => {
      l(arg0);
    })
  }

  public listen(callback: (arg0: T) => void){
    let idx = this.listeners.findIndex((c) => c == callback);
    if (idx != -1) return;

    this.listeners.push(callback);
  }

  public unlisten(callback:Function){
    let idx = this.listeners.findIndex((c) => c == callback);
    if (idx == -1) return;

    this.listeners.splice(idx, 1);
  }

  public clear(){
    this.listeners = [];
  }
}

export class Action2<T,K> {
  private listeners:Array<(arg0: T, arg1:K) => void> = [];

  public emit(arg0:T, arg1:K){
    this.listeners.forEach((l) => {
      l(arg0, arg1);
    })
  }

  public listen(callback: (arg0: T, arg1:K) => void){
    let idx = this.listeners.findIndex((c) => c == callback);
    if (idx != -1) return;

    this.listeners.push(callback);
  }

  public unlisten(callback:Function){
    let idx = this.listeners.findIndex((c) => c == callback);
    if (idx == -1) return;

    this.listeners.splice(idx, 1);
  }

  public clear(){
    this.listeners = [];
  }
}