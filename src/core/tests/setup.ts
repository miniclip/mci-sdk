/// <reference types="../../../types/fbinstant" />

const globalAny:any = global;

var chaiM = require("chai");
var chaiAsPromised = require("chai-as-promised");
chaiM.use(chaiAsPromised);

var __localStorage = {};

const local_getDataAsync = function(keys:string[]){
  return new Promise((resolve, reject) => {
    let results = {};
    keys.forEach((key:string) => {
      if (key in __localStorage){
        results[key] = __localStorage[key];
      }
    })
    resolve(results);
  })
}

const local_setDataAsync = function(data:any){
  return new Promise((resolve, reject) => {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      __localStorage[key] = data[key];
    })
    resolve();
  })
}

globalAny.resetFBLocalStorage = () => {
  __localStorage = {};
}

globalAny.FBInstant = {
  context: {
    getID(){ return "123"; }
  },
  player: {
    getID(){ return "1"; },
    getName(){ return "Player1"; },
    getPhoto(){ return ""; },
    getSignedPlayerInfoAsync: () => new Promise(resolve => {
        resolve({
          getSignature: () => "test_signature",
          getPlayerID: () => 123456789
        });
    }),
    getConnectedPlayersAsync: () => new Promise(resolve => {
      resolve([
        new DummyPlayer("1", "John", ""),
        new DummyPlayer("2", "Smith", "")
      ]);
    }),
    getDataAsync: local_getDataAsync,
    setDataAsync: local_setDataAsync,
    flushDataAsync: () => { return Promise.resolve(); }
  },
  setSessionData: () => {}
  
};


class DummyPlayer implements FBInstant.ContextPlayer {
  id:string;
  name:string;
  photo:string;
  
  constructor(id:string, name:string, photo:string){
    this.id = id;
    this.name = name;
    this.photo = photo;
  }

  getID(){ return this.id; }
  getName(){ return this.name; }
  getPhoto(){ return this.photo; }
}