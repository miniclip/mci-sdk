
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