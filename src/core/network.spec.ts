import 'mocha';

import { assert, expect } from "chai";
import { Store } from '../store';
import * as nock from 'nock';
import { NetworkManager } from "./network";
import DIContainer from '../utils/dicontainer';
import { Modules } from '../services';

const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
const HTTP_STATUS_OK = 200;
const BASE_ENDPOINT = "http://example.com";


describe('NetworkManager', () => {
    
    const container = new DIContainer();

    const store:Store = container.bind(Modules.GLOBAL_STORE, new Store());
    var network:NetworkManager;

    beforeEach(() => {

        store.clear();
        network = new NetworkManager({
            endpointURL: BASE_ENDPOINT,
            container
        });

    })

    afterEach(() => {
    });

    it('should add auth token header if set in store', (done) => {
        store.set('auth-token', 'dummy');
        
        let mock = nock(BASE_ENDPOINT)
                        .matchHeader("x-auth-token", "dummy")
                        .get('/test1')
                        .reply(HTTP_STATUS_OK);


       

        network.get("/test1").then(() => {
            assert.isTrue(mock.isDone());

            done();
        });

        
    })

    it('should retry on network failure', (done) => {
        
        let requestCount = 0;

        nock(BASE_ENDPOINT)
                .get("/test2")
                .reply((_, __, cb:nock.ReplyCallback) => {
                    if (++requestCount <= 2){
                        cb(null, [HTTP_STATUS_INTERNAL_SERVER_ERROR, '']);
                    } else { 
                        cb(null, [HTTP_STATUS_OK, '']);
                    }
                }).persist()

        network.get(BASE_ENDPOINT+'/test2').then((_) => {
            expect(requestCount).greaterThan(2);
            done();
        }, (error) => {
            console.log(error);
            done(error);
            //done(new Error("network request failed"));
        });
    });

    it('should authenticate on forbidden response', (done) => {
        store.set('auth-token', 'dummy');

        let requestCount = 0;

        nock(BASE_ENDPOINT)
                .get("/test3")
                .reply((_, __, cb:nock.ReplyCallback) => {
                    if (++requestCount <= 1){
                        cb(null, [401, '']);
                    } else { 
                        cb(null, [HTTP_STATUS_OK, '', {
                            'x-auth-token': 'cenas'
                        }]);
                    }
                }).persist();

        network.get(BASE_ENDPOINT+'/test3').then((_) => {
            assert.equal(store.get('auth-token'), "cenas");
        }).then(()=>{
            done();
        });
    })

    it('should update auth token from store', (done) => {
        store.set('auth-token', 'dummy');

        nock(BASE_ENDPOINT)
                .get("/test4")
                .reply(HTTP_STATUS_OK, '', {
                    'x-auth-token': 'dummy-update'
                });

        network.get(BASE_ENDPOINT+'/test4').then((_) => {
            assert.equal(store.get('auth-token'), "dummy-update");
        }, (_) => {
            assert.equal(store.get('auth-token'), "dummy-update");
        }).then(() => {
            done();
        })
    })
})