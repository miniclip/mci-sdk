!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("MCInstant",[],t):"object"==typeof exports?exports.MCInstant=t():e.MCInstant=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=13)}([function(e,t,n){"use strict";var r=n(6),o=n(19),s=Object.prototype.toString;function i(e){return"[object Array]"===s.call(e)}function a(e){return null!==e&&"object"==typeof e}function u(e){return"[object Function]"===s.call(e)}function c(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===s.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===s.call(e)},isFile:function(e){return"[object File]"===s.call(e)},isBlob:function(e){return"[object Blob]"===s.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)c(arguments[r],n);return t},extend:function(e,t,n){return c(t,function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.NETWORK="network",e.WALLET="wallet",e.CHALLENGES="challenges",e.SESSION="session",e.CURRENCIES="currencies",e.INSTANT_STORAGE="storage",e.GLOBAL_STORE="global_store",e.EVENTS="events"}(t.Modules||(t.Modules={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.BaseService=class{constructor(){this.container=null}_boot(){}setContainer(e){return this.container=e,this}get events(){return this.container.events}}},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(22),s={"Content-Type":"application/x-www-form-urlencoded"};function i(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,u={adapter:("undefined"!=typeof XMLHttpRequest?a=n(7):void 0!==t&&(a=n(7)),a),transformRequest:[function(e,t){return o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(i(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(i(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};u.headers={common:{Accept:"application/json, text/plain, */*"}},r.forEach(["delete","get","head"],function(e){u.headers[e]={}}),r.forEach(["post","put","patch"],function(e){u.headers[e]=r.merge(s)}),e.exports=u}).call(this,n(21))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.EVENT_CHALLENGE_ENDED="challenge_ended",t.EVENT_WALLET_BALANCE_UPDATED="wallet_balance_updated"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(15);let o=0;var s;!function(e){e.ERROR="error",e.WARN="warn",e.INFO="info",e.DEBUG="debug"}(s=t.LogLevel||(t.LogLevel={}));const i=r.methodFactory;function a(){}r.methodFactory=function(e,t,n){const r=i(e,t,n);return function(){const t=[`[${e.toUpperCase()}]`,n];for(let e=0;e<arguments.length;e+=1)t.push(arguments[e]);r.apply(void 0,t)}},t.getLogger=function(e){const t=o;return o+=1,r.getLogger(e+t)},t.loggerFromLoggingFunc=function(e,t){const n=o;o+=1;const i=r.getLogger(e+n);return i.methodFactory=function(e,n,r){return i=n,((o=e)===s.DEBUG?i<=1:o===s.INFO?i<=2:o===s.WARN?i<=3:o!==s.ERROR||i<=4)?function(...n){t(e,`${r} ${n.map(e=>JSON.stringify(e)).join(" ")}`)}:a;var o,i},i}},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";var r=n(0),o=n(23),s=n(25),i=n(26),a=n(27),u=n(8),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(28);e.exports=function(e){return new Promise(function(t,l){var d=e.data,f=e.headers;r.isFormData(d)&&delete f["Content-Type"];var h=new XMLHttpRequest,p="onreadystatechange",g=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in h||a(e.url)||(h=new window.XDomainRequest,p="onload",g=!0,h.onprogress=function(){},h.ontimeout=function(){}),e.auth){var y=e.auth.username||"",_=e.auth.password||"";f.Authorization="Basic "+c(y+":"+_)}if(h.open(e.method.toUpperCase(),s(e.url,e.params,e.paramsSerializer),!0),h.timeout=e.timeout,h[p]=function(){if(h&&(4===h.readyState||g)&&(0!==h.status||h.responseURL&&0===h.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in h?i(h.getAllResponseHeaders()):null,r={data:e.responseType&&"text"!==e.responseType?h.response:h.responseText,status:1223===h.status?204:h.status,statusText:1223===h.status?"No Content":h.statusText,headers:n,config:e,request:h};o(t,l,r),h=null}},h.onerror=function(){l(u("Network Error",e,null,h)),h=null},h.ontimeout=function(){l(u("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",h)),h=null},r.isStandardBrowserEnv()){var v=n(29),E=(e.withCredentials||a(e.url))&&e.xsrfCookieName?v.read(e.xsrfCookieName):void 0;E&&(f[e.xsrfHeaderName]=E)}if("setRequestHeader"in h&&r.forEach(f,function(e,t){void 0===d&&"content-type"===t.toLowerCase()?delete f[t]:h.setRequestHeader(t,e)}),e.withCredentials&&(h.withCredentials=!0),e.responseType)try{h.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&h.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&h.upload&&h.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){h&&(h.abort(),l(e),h=null)}),void 0===d&&(d=null),h.send(d)})}},function(e,t,n){"use strict";var r=n(24);e.exports=function(e,t,n,o,s){var i=new Error(e);return r(i,t,n,o,s)}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){e.exports=n(37).default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(43);t.Challenge=r.Challenge},function(e,t,n){"use strict";function r(e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n])}Object.defineProperty(t,"__esModule",{value:!0}),r(n(14)),r(n(12)),r(n(4))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(5),o=n(16),s=n(39),i=n(1),a=n(40),u=n(42),c=n(44),l=n(45),d=n(46),f=n(47);class h{constructor({environment:e=p.PRODUCTION,logLevel:t=r.LogLevel.INFO,app_id:n="",challenge_reward:g={value:100,currency:"points"},currencies:y=["points"]}){this.di=new a.default,this.logger=r.getLogger(h.loggerName),this.logger.setLevel(t);const _=this.di.bind(i.Modules.GLOBAL_STORE,new l.Store),v=new c.CurrencyService;v.clear(),v.addCurrencies(y),_.set("challenge_reward",g);const E=new o.NetworkManager({endpointURL:this.getEndpointUrl(e,n),container:this.di});this.di.bind(i.Modules.NETWORK,E),this.di.bind(i.Modules.SESSION,new d.SessionService),this.di.bind(i.Modules.INSTANT_STORAGE,new f.InstantStorage),this.di.bind(i.Modules.CURRENCIES,v),this.di.bind(i.Modules.WALLET,new s.WalletService),this.di.bind(i.Modules.CHALLENGES,new u.ChallengeService),this.di.boot(),this.challenges=this.di.get(i.Modules.CHALLENGES),this.wallet=this.di.get(i.Modules.WALLET).publicWallet}get events(){return this.di.events}getEndpointUrl(e,t=""){var n="";switch(e){case"development":n="fbi-ws-dev";break;case"sandbox":n="fbi-ws-sandbox";break;default:n="prod-mci-ws"}return`https://${n}.miniclippt.com/apps/${t}`}}var p;h.loggerName="mc:instant",h.version="0.1.5",t.MCInstant=h,function(e){e.PRODUCTION="production",e.SANDBOX="sandbox"}(p=t.MCIEnvironment||(t.MCIEnvironment={}))},function(e,t,n){var r,o;!function(s,i){"use strict";void 0===(o="function"==typeof(r=function(){var e=function(){},t="undefined",n=["trace","debug","info","warn","error"];function r(e,t){var n=e[t];if("function"==typeof n.bind)return n.bind(e);try{return Function.prototype.bind.call(n,e)}catch(t){return function(){return Function.prototype.apply.apply(n,[e,arguments])}}}function o(t,r){for(var o=0;o<n.length;o++){var s=n[o];this[s]=o<t?e:this.methodFactory(s,t,r)}this.log=this.debug}function s(n,s,i){return function(n){"debug"===n&&(n="log");return typeof console!==t&&(void 0!==console[n]?r(console,n):void 0!==console.log?r(console,"log"):e)}(n)||function(e,n,r){return function(){typeof console!==t&&(o.call(this,n,r),this[e].apply(this,arguments))}}.apply(this,arguments)}function i(e,r,i){var a,u=this,c="loglevel";function l(){var e;if(typeof window!==t){try{e=window.localStorage[c]}catch(e){}if(typeof e===t)try{var n=window.document.cookie,r=n.indexOf(encodeURIComponent(c)+"=");-1!==r&&(e=/^([^;]+)/.exec(n.slice(r))[1])}catch(e){}return void 0===u.levels[e]&&(e=void 0),e}}e&&(c+=":"+e),u.name=e,u.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},u.methodFactory=i||s,u.getLevel=function(){return a},u.setLevel=function(r,s){if("string"==typeof r&&void 0!==u.levels[r.toUpperCase()]&&(r=u.levels[r.toUpperCase()]),!("number"==typeof r&&r>=0&&r<=u.levels.SILENT))throw"log.setLevel() called with invalid level: "+r;if(a=r,!1!==s&&function(e){var r=(n[e]||"silent").toUpperCase();if(typeof window===t)return;try{return void(window.localStorage[c]=r)}catch(e){}try{window.document.cookie=encodeURIComponent(c)+"="+r+";"}catch(e){}}(r),o.call(u,r,e),typeof console===t&&r<u.levels.SILENT)return"No console available for logging"},u.setDefaultLevel=function(e){l()||u.setLevel(e,!1)},u.enableAll=function(e){u.setLevel(u.levels.TRACE,e)},u.disableAll=function(e){u.setLevel(u.levels.SILENT,e)};var d=l();null==d&&(d=null==r?"WARN":r),u.setLevel(d,!1)}var a=new i,u={};a.getLogger=function(e){if("string"!=typeof e||""===e)throw new TypeError("You must supply a name when creating a logger.");var t=u[e];return t||(t=u[e]=new i(e,a.getLevel(),a.methodFactory)),t};var c=typeof window!==t?window.log:void 0;return a.noConflict=function(){return typeof window!==t&&window.log===a&&(window.log=c),a},a.getLoggers=function(){return u},a})?r.call(t,n,t,e):r)||(e.exports=o)}()},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,a)}u((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=n(17),s=n(1),i=n(11),{isNetworkOrIdempotentRequestError:a}=n(11),u="auth-token",c="x-auth-token",l="x-fb-signature";t.DummyNetworkManager=class{constructor(){this.loopResponses=!1,this.responses=[],this.iterator=0}createResponse(e,t){return{data:t,status:e,statusText:"",headers:[],config:{}}}getNextResponse(){if(0==this.responses.length)throw new Error("No responses were set!");if(this.iterator>=this.responses.length){if(!this.loopResponses)throw new Error("Consumed all responses");this.iterator=0}return this.responses[this.iterator++]}addResponse(e,t=null){let n=JSON.parse(JSON.stringify(t));this.responses.push({status:e,data:n})}clear(){this.responses=[],this.iterator=0}get(e,t){return new Promise(e=>{let{status:t,data:n}=this.getNextResponse();e(this.createResponse(t,n))})}post(e,t,n){return new Promise(e=>{let{status:t,data:n}=this.getNextResponse();e(this.createResponse(t,n))})}put(e,t,n){return new Promise(e=>{let{status:t,data:n}=this.getNextResponse();e(this.createResponse(t,n))})}delete(e,t){return new Promise(e=>{let{status:t,data:n}=this.getNextResponse();e(this.createResponse(t,n))})}};t.NetworkManager=class{constructor({endpointURL:e="",container:t}){this.store=t.get(s.Modules.GLOBAL_STORE),this.axios=o.default.create({baseURL:e}),this.axios.interceptors.request.use(e=>(e.headers["Content-Type"]="application/json",new Promise(t=>{this.store.get(u)?(e.headers[c]=this.store.get(u),t(e)):this.getSignedMessage().then(n=>{e.headers[l]=n.getSignature(),t(e)}).catch(()=>{t(e)})}))),this.axios.interceptors.response.use(e=>{let t=e.status;if(t>=200&&t<=299){const t=e.headers[c];t&&this.store.set(u,t)}return e},e=>r(this,void 0,void 0,function*(){if(e.response&&401==e.response.status){this.store.set(u,null);try{let t=yield this.getSignedMessage();e.config.headers[l]=t.getSignature()}catch(e){console.error("failed to sign request",e)}}throw e})),i(this.axios,{retries:3,retryCondition:e=>a(e)||401==e.response.status,retryDelay:e=>500*e})}get(e,t){return this.axios.get(e,t)}post(e,t,n){return this.axios.post(e,t,n)}put(e,t,n){return this.axios.put(e,t,n)}delete(e,t){return this.axios.delete(e,t)}getSignedMessage(){return FBInstant.player.getSignedPlayerInfoAsync()}}},function(e,t,n){e.exports=n(18)},function(e,t,n){"use strict";var r=n(0),o=n(6),s=n(20),i=n(3);function a(e){var t=new s(e),n=o(s.prototype.request,t);return r.extend(n,s.prototype,t),r.extend(n,t),n}var u=a(i);u.Axios=s,u.create=function(e){return a(r.merge(i,e))},u.Cancel=n(10),u.CancelToken=n(35),u.isCancel=n(9),u.all=function(e){return Promise.all(e)},u.spread=n(36),e.exports=u,e.exports.default=u},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(n(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}(e)||!!e._isBuffer)}},function(e,t,n){"use strict";var r=n(3),o=n(0),s=n(30),i=n(31);function a(e){this.defaults=e,this.interceptors={request:new s,response:new s}}a.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(r,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var t=[i,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},o.forEach(["delete","get","head","options"],function(e){a.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){a.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=a},function(e,t){var n,r,o=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===s||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:s}catch(e){n=s}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var u,c=[],l=!1,d=-1;function f(){l&&u&&(l=!1,u.length?c=u.concat(c):d=-1,c.length&&h())}function h(){if(!l){var e=a(f);l=!0;for(var t=c.length;t;){for(u=c,c=[];++d<t;)u&&u[d].run();d=-1,t=c.length}u=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function g(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new p(e,t)),1!==c.length||l||a(h)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=g,o.addListener=g,o.once=g,o.off=g,o.removeListener=g,o.removeAllListeners=g,o.emit=g,o.prependListener=g,o.prependOnceListener=g,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(8);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},function(e,t,n){"use strict";var r=n(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var s;if(n)s=n(t);else if(r.isURLSearchParams(t))s=t.toString();else{var i=[];r.forEach(t,function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),i.push(o(t)+"="+o(e))}))}),s=i.join("&")}return s&&(e+=(-1===e.indexOf("?")?"?":"&")+s),e}},function(e,t,n){"use strict";var r=n(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,s,i={};return e?(r.forEach(e.split("\n"),function(e){if(s=e.indexOf(":"),t=r.trim(e.substr(0,s)).toLowerCase(),n=r.trim(e.substr(s+1)),t){if(i[t]&&o.indexOf(t)>=0)return;i[t]="set-cookie"===t?(i[t]?i[t]:[]).concat([n]):i[t]?i[t]+", "+n:n}}),i):i}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,n,s=String(e),i="",a=0,u=r;s.charAt(0|a)||(u="=",a%1);i+=u.charAt(63&t>>8-a%1*8)){if((n=s.charCodeAt(a+=.75))>255)throw new o;t=t<<8|n}return i}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,s,i){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(s)&&a.push("domain="+s),!0===i&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var r=n(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=o},function(e,t,n){"use strict";var r=n(0),o=n(32),s=n(9),i=n(3),a=n(33),u=n(34);function c(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return c(e),e.baseURL&&!a(e.url)&&(e.url=u(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||i.adapter)(e).then(function(t){return c(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return s(t)||(c(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(10);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new r(e),t(n.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(t){e=t}),cancel:e}},e.exports=o},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isNetworkError=a,t.isRetryableError=l,t.isSafeRequestError=d,t.isIdempotentRequestError=f,t.isNetworkOrIdempotentRequestError=h,t.exponentialDelay=g,t.default=_;var r,o=n(38),s=(r=o)&&r.__esModule?r:{default:r};var i="axios-retry";function a(e){return!e.response&&Boolean(e.code)&&"ECONNABORTED"!==e.code&&(0,s.default)(e)}var u=["get","head","options"],c=u.concat(["put","delete"]);function l(e){return"ECONNABORTED"!==e.code&&(!e.response||e.response.status>=500&&e.response.status<=599)}function d(e){return!!e.config&&(l(e)&&-1!==u.indexOf(e.config.method))}function f(e){return!!e.config&&(l(e)&&-1!==c.indexOf(e.config.method))}function h(e){return a(e)||f(e)}function p(){return 0}function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=100*Math.pow(2,e);return t+.2*t*Math.random()}function y(e){var t=e[i]||{};return t.retryCount=t.retryCount||0,e[i]=t,t}function _(e,t){e.interceptors.request.use(function(e){return y(e).lastRequestTime=Date.now(),e}),e.interceptors.response.use(null,function(n){var r=n.config;if(!r)return Promise.reject(n);var o=function(e,t){return Object.assign({},t,e[i])}(r,t),s=o.retries,a=void 0===s?3:s,u=o.retryCondition,c=void 0===u?h:u,l=o.retryDelay,d=void 0===l?p:l,f=o.shouldResetTimeout,g=void 0!==f&&f,_=y(r);if(c(n)&&_.retryCount<a){_.retryCount+=1;var v=d(_.retryCount,n);if(function(e,t){e.defaults.agent===t.agent&&delete t.agent,e.defaults.httpAgent===t.httpAgent&&delete t.httpAgent,e.defaults.httpsAgent===t.httpsAgent&&delete t.httpsAgent}(e,r),!g&&r.timeout&&_.lastRequestTime){var E=Date.now()-_.lastRequestTime;r.timeout=Math.max(r.timeout-E-v,1)}return r.transformRequest=[function(e){return e}],new Promise(function(t){return setTimeout(function(){return t(e(r))},v)})}return Promise.reject(n)})}_.isNetworkError=a,_.isSafeRequestError=d,_.isIdempotentRequestError=f,_.isNetworkOrIdempotentRequestError=h,_.exponentialDelay=g,_.isRetryableError=l},function(e,t,n){"use strict";var r=["ETIMEDOUT","ECONNRESET","EADDRINUSE","ESOCKETTIMEDOUT","ECONNREFUSED","EPIPE"],o=["ENOTFOUND","ENETUNREACH","UNABLE_TO_GET_ISSUER_CERT","UNABLE_TO_GET_CRL","UNABLE_TO_DECRYPT_CERT_SIGNATURE","UNABLE_TO_DECRYPT_CRL_SIGNATURE","UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY","CERT_SIGNATURE_FAILURE","CRL_SIGNATURE_FAILURE","CERT_NOT_YET_VALID","CERT_HAS_EXPIRED","CRL_NOT_YET_VALID","CRL_HAS_EXPIRED","ERROR_IN_CERT_NOT_BEFORE_FIELD","ERROR_IN_CERT_NOT_AFTER_FIELD","ERROR_IN_CRL_LAST_UPDATE_FIELD","ERROR_IN_CRL_NEXT_UPDATE_FIELD","OUT_OF_MEM","DEPTH_ZERO_SELF_SIGNED_CERT","SELF_SIGNED_CERT_IN_CHAIN","UNABLE_TO_GET_ISSUER_CERT_LOCALLY","UNABLE_TO_VERIFY_LEAF_SIGNATURE","CERT_CHAIN_TOO_LONG","CERT_REVOKED","INVALID_CA","PATH_LENGTH_EXCEEDED","INVALID_PURPOSE","CERT_UNTRUSTED","CERT_REJECTED"];e.exports=function(e){return!e||!e.code||(-1!==r.indexOf(e.code)||-1===o.indexOf(e.code))}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,a)}u((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=n(1),s=n(2),i=n(4),a="_wallet";t.WalletService=class extends s.BaseService{constructor(){super(),this._wallet={}}_boot(){this._currencies=this.container.get(o.Modules.CURRENCIES),this._cloud=this.container.get(o.Modules.INSTANT_STORAGE),this._wallet=this._currencies.get().reduce((e,t)=>Object.assign({},e,{[t]:0}),{})}get currencies(){return this._wallet}getBalance(e){return r(this,void 0,void 0,function*(){let t=yield this._cloud.get(a);Object.keys(t).forEach(e=>{null==t[e]&&delete t[e]});let n=Object.assign({},Object.assign(this.currencies,t));return Object.keys(n).forEach(t=>{null!=e&&-1==e.indexOf(t)&&delete n[t]}),n})}setBalance(e,t){return new Promise((n,r)=>{if(!(e in this.currencies))throw new Error(e+" does not exist.");let o={};o[e]=t;const s=Object.assign(this.currencies,o);this._cloud.set(a,s).then(this._cloud.flush).then(e=>{this.events.emit(i.EVENT_WALLET_BALANCE_UPDATED),n(e)})})}updateBalance(e,t){return r(this,void 0,void 0,function*(){try{yield this.setBalance(t,e)}catch(e){return console.error(e),{}}return yield this.getBalance([t])})}addBalance(e,t){return r(this,void 0,void 0,function*(){let n=(yield this.getBalance())[t]||0;n+=e,console.log("Add balance by ",e,t);try{return yield this.setBalance(t,n),!0}catch(e){console.error(e)}return!1})}get publicWallet(){return this._publicWallet||(this._publicWallet=new u(this)),this._publicWallet}};class u{constructor(e){this.wallet=e}getBalance(e){return this.wallet.getBalance(e)}addBalance(e,t){return this.wallet.addBalance(e,t)}updateBalance(e,t){return this.wallet.updateBalance(e,t)}}t.PublicWallet=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(5),o=n(41),s=n(2);t.default=class{constructor(){this.modules={},this.logger=r.getLogger("dicontainer"),this.events=new o.EventEmitter}bind(e,t){return this.modules[e]=t,t instanceof s.BaseService&&(t.container=this),t}get(e){if(e in this.modules)return this.modules[e];throw new Error(`Failed to get ${e} module`)}boot(){Object.keys(this.modules).forEach(e=>{let t=this.modules[e];t instanceof s.BaseService&&t._boot()})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.EventEmitter=class{constructor(){this.events={}}on(e,t){return"object"!=typeof this.events[e]&&(this.events[e]=[]),this.events[e].push(t),()=>this.removeListener(e,t)}removeListener(e,t){if("object"!=typeof this.events[e])return;const n=this.events[e].indexOf(t);n>-1&&this.events[e].splice(n,1)}removeAllListeners(){Object.keys(this.events).forEach(e=>this.events[e].splice(0,this.events[e].length))}emit(e,...t){"object"==typeof this.events[e]&&[...this.events[e]].forEach(e=>e.apply(this,t))}once(e,t){const n=this.on(e,(...e)=>{n(),t.apply(this,e)});return n}}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,a)}u((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=n(1),s=n(12),i=n(2),a=n(4);t.ChallengeService=class extends i.BaseService{constructor(){super(),this.challenges=[],this.initialized=!1,this.initialFetchResolver=null,this.initialFetch=new Promise(e=>{this.initialFetchResolver=e})}_boot(){this.wallet=this.container.get(o.Modules.WALLET),this.network=this.container.get(o.Modules.NETWORK),this.store=this.container.get(o.Modules.GLOBAL_STORE)}updateList(){return r(this,void 0,void 0,function*(){const e=FBInstant.player.getID(),t="/players/"+e+"/challenges";try{const n=yield this.network.get(t);if(!Array.isArray(n.data))return[];let r=n.data;for(let t=0;t<r.length;t++){let n=new s.Challenge(this.container,e).parse(r[t]);(yield this.consumeChallenge(n))&&(n=void 0),r[t]=n}r=r.filter(e=>null!=e),this.challenges=r.length>0?r:[]}catch(e){console.error("Failed to fetch challenges",e),this.challenges=[]}return this.initialized=!0,this.challenges})}getAll(){return r(this,void 0,void 0,function*(){return new Promise(e=>{this.initialized?e(this.challenges):this.updateList().then(t=>{e(t)})})})}getByContext(e){return r(this,void 0,void 0,function*(){return(yield this.getAll()).find(t=>t.contextId==e)})}getByChallengeId(e){return r(this,void 0,void 0,function*(){return(yield this.getAll()).find(t=>t.challengeId==e)})}getFromToken(e){return r(this,void 0,void 0,function*(){return new Promise(t=>r(this,void 0,void 0,function*(){let n=this.create();if(n.loadShareToken(e)||t(void 0),null==n.challengeId)return void t(n);let r=yield this.getByChallengeId(n.challengeId);t(r||n)}))})}create({score:e=0,duration:t=604800}={}){let n=FBInstant.player.getID(),r=new s.Challenge(this.container,n);return r.setDuration(t).setScore(e).setContext(FBInstant.context.getID()),r}hasPlayerWon(e){let t=[];return(t=e.playerIds.map(t=>({id:t,score:e.getScore(t)})).sort((e,t)=>isFinite(e.score-t.score)?t.score-e.score:isFinite(e.score)?-1:1))[0].id==e.getPlayerId()}consumeChallenge(e){return r(this,void 0,void 0,function*(){if(!e||e.time_left>0||-1==e.time_left)return!1;const t="/players/"+FBInstant.player.getID()+"/challenges/"+e.challengeId;try{const n=(yield this.network.delete(t)).status;if(n<200||n>299)return!0;let r=this.store.get("challenge_reward",null);const o=this.hasPlayerWon(e);null!=r&&o&&this.wallet.addBalance(r.value,r.currency);let s={challenge:e.data,won:o,reward:r};return this.events.emit(a.EVENT_CHALLENGE_ENDED,s),!0}catch(e){console.error("Failed to consume: ",e)}return!1})}}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,s){function i(e){try{u(r.next(e))}catch(e){s(e)}}function a(e){try{u(r.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(i,a)}u((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const o=n(1);t.Challenge=class{constructor(e,t){this._currentPlayer="",this._originalScore=0,this._data={type:"challenge",score:{},duration:604800,context_id:"",end_ts:-1,updated_ts:-1,version:1},this._session=e.get(o.Modules.SESSION),this._network=e.get(o.Modules.NETWORK),this._currentPlayer=t}parse(e){if(null==e)return;let{end_ts:t,updated_ts:n,context_id:r,challenge_id:o}=e;if(null==r)return;let s="score"in e?e.score:{};return this._data.context_id=r||"",this._data.score=s,this._data.end_ts=t||-1,this._data.updated_ts=n||-1,this._data.challenge_id=o,this._originalScore=this.getPlayerScore(),this}setScore(e){if(null==this._currentPlayer)return console.error("Challenge current player hasn't been set"),this;let t=this._currentPlayer;return this._data.score[t]=e,this}setDuration(e){return this._data.duration=e,this}setContext(e){return this.data.context_id=e,this}setChallengeId(e){return this._data.challenge_id=e,this}hasScore(e){return null!=e&&!!(this._data.score&&e in this._data.score)}getScore(e){return null==e?NaN:this.hasScore(e)?this._data.score[e]:NaN}getPlayerId(){return this._currentPlayer}getPlayerScore(){return this.getScore(this._currentPlayer)}playerHasScore(){return this.hasScore(this._currentPlayer)}getOpponentId(){return Object.keys(this._data.score).find(e=>e!=this._currentPlayer)}getOpponentScore(){return this.getScore(this.getOpponentId())}opponentHasScore(){return this.hasScore(this.getOpponentId())}get playerIds(){return Object.keys(this._data.score)}get duration(){return this._data.duration}get time_left(){if(!isFinite(this._data.end_ts)||this._data.end_ts<0)return-1;let e=Math.floor((new Date).getTime()/1e3);return Math.max(0,this._data.end_ts-e)}get expired(){return 0==this.time_left}get updated_at(){return this._data.updated_ts}get contextId(){return this._data.context_id}get challengeId(){return this._data.challenge_id}get data(){return this._data}getShareToken(){return JSON.stringify(this.data)}loadShareToken(e){try{if("string"==typeof e){let t=JSON.parse(e);this._data=t}else"object"==typeof e&&(this._data=e)}catch(e){return!1}return!0}save(){return r(this,void 0,void 0,function*(){let e=this._data.type,t=this._data.duration,n=this.contextId,r=(new Date).getTimezoneOffset(),o=this.getPlayerScore();if(null==o)return console.error("The score for current player hasn't been set."),!1;isFinite(this._originalScore)&&(o-=this._originalScore);const s=this.getPlayerId(),i={context_id:n,score:o,duration:t,timezone_offset:r};try{var a;a=this.challengeId?yield this._network.put(`/players/${s}/challenges/${this.challengeId}`,i):yield this._network.post(`/players/${s}/challenges`,i),this.parse(a.data),this._session.setData({type:e,duration:t,score:o,challengeId:this.challengeId})}catch(e){return!1}return!0})}delete(){return r(this,void 0,void 0,function*(){const e="/players/"+this.getPlayerId()+"/challenges/"+this.challengeId;try{const t=(yield this._network.delete(e)).status;if(t>=200&&t<=299)return!0}catch(e){}return!1})}toJSON(){return JSON.stringify(this._data)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(2),o=["points"];t.CurrencyService=class extends r.BaseService{constructor(){super(...arguments),this._currencies=o.slice(0)}addCurrency(e){null==this._currencies.find(t=>t==e)&&this._currencies.push(e)}clear(){this._currencies=[]}addCurrencies(e){Array.isArray(e)&&e.forEach(e=>{this.addCurrency(e)})}get(){return this._currencies}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Store=class{constructor(e={}){this.initial=e,this.clear()}get(e,t){return this.state.hasOwnProperty(e)?this.state[e]:t}set(e,t){this.state[e]=t}clear(){this.state=this.initial}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(2);class o extends r.BaseService{constructor(){super(),this.internalState={},this.publicState={},this._publicSession=new s(this),this.timezoneOffset=(new Date).getTimezoneOffset(),this.syncSession()}getPublicSession(){return this._publicSession}setPublicState(e){this.publicState=e}reset(){this.internalState={}}setData(e){this.mergeData(this.internalState,e),this.syncSession()}syncSession(){let e=Object.assign({},this.publicState);e[o.PAYLOAD_NS]=this.internalState;const t=FBInstant.player.getName(),n=FBInstant.player.getPhoto();e._mc={timezone_offset:this.timezoneOffset,name:t,avatar:n},FBInstant.setSessionData(e)}mergeData(e,t){Object.keys(t).forEach(n=>{e[n]=t[n]})}}o.PAYLOAD_NS="mc:sessionPayload",t.SessionService=o;class s{constructor(e){this._session=e}set(e){this._session.setPublicState(e),this._session.syncSession()}}t.PublicSession=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r="_mc:";class o{get(e){const t=r+e;return FBInstant.player.getDataAsync([t]).then(e=>t in e?e[t]:{})}set(e,t){let n={};return n[r+e]=t,FBInstant.player.setDataAsync(n)}flush(){return FBInstant.player.flushDataAsync()}}o.mcStoragePayload="mc:instantPayload",t.InstantStorage=o}])});
//# sourceMappingURL=mcinstant.js.map