import 'mocha';
import { expect, assert} from "chai";
import { Store } from "./store";

describe('Store', () => {
    
    describe('constructor()', () => {
        it('should build a store with the initial status', () => {

            const store = new Store({ prop1: true, prop2: 3});
            assert.instanceOf(store, Store);
            assert.equal(store.get('prop1'), true)
            assert.equal(store.get('prop2'), 3)
            assert.equal(store.get('prop3'), null);
        })
    })

    describe('has a method to get a store value', () => {
        var store:Store;

        beforeEach(() => {
            store = new Store({ prop1: 10 });
        })

        it('should return null if the value is not found', () => {
            assert.equal(store.get('prop1'), 10);
            assert.equal(store.get('prop2'), null);
        })

        it('should return the default value if prop is not found', () => {
            assert.equal(store.get('prop1'), 10);
            assert.equal(store.get('prop2', 15), 15);
        })
    })

    describe('has a method to set a store value', function() {
        var store:Store;
        
        beforeEach(() => {
            store = new Store({ });
        })
        it('should save the set value', () => {
            assert.equal(store.get('prop1'), null);
            store.set('prop1', 9999);
            assert.equal(store.get('prop1'), 9999);
        })

        it('should overwrite the set value', () => {
            store.set('prop1', 9999);
            assert.equal(store.get('prop1'), 9999);
            store.set('prop1', 1);
            assert.equal(store.get('prop1'), 1);
        })
    })
})