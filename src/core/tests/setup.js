var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
 chai.use(chaiAsPromised);

var __localStorage = {};

const local_getDataAsync = function(keys){
  return new Promise((resolve, reject) => {
    let results = {};
    keys.forEach((key) => {
      if (key in __localStorage){
        results[key] = __localStorage[key];
      }
    })
    resolve(results);
  })
}

const local_setDataAsync = function(data){
  return new Promise((resolve, reject) => {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      __localStorage[key] = data[key];
    })
    resolve();
  })
}

global.resetFBLocalStorage = () => {
  __localStorage = {};
}

global.FBInstant = {
  context: {
    getID(){ return "123"; }
  },
  player: {
    getID(){ return "1"; },
    getSignedPlayerInfoAsync: () => new Promise(resolve => {
        resolve({
          getSignature: () => "test_signature",
          getPlayerID: () => 123456789
        });
    }),
    getDataAsync: local_getDataAsync,
    setDataAsync: local_setDataAsync,
    flushDataAsync: () => { return Promise.resolve(); }
  },
  setSessionData: () => {}
  
};


