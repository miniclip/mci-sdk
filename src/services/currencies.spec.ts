import 'mocha';


import { expect } from "chai";
import { CurrencyService } from './currencies';
declare const resetFBLocalStorage:Function;

describe('CurrencyService', () => {

  beforeEach(() => {
  })

  it('is initialized with one currency', () => {
    const currencies = new CurrencyService();
    
    let defaultCurrencies = currencies.get();
    expect(defaultCurrencies).to.have.length(1);
    expect(defaultCurrencies).to.include("points");
  })

  it('should support adding currencies', () => {
    const currencies = new CurrencyService();
    
    currencies.addCurrencies(["coins", "cash"]);
    let list = currencies.get();
    expect(list).to.have.lengthOf(3);
    expect(list).to.include("coins");
    expect(list).to.include("cash");
    expect(list).to.include("points");

  })

  it('show support clearing currencies list', () => {
    const currencies = new CurrencyService();
        
    expect(currencies.get()).to.have.lengthOf(1);
    currencies.clear();

    currencies.addCurrencies(["coins", "cash"]);
    let list = currencies.get();
    expect(list).to.include("coins");
    expect(list).to.include("cash");
    expect(list).to.not.include("points");
  })

});