import 'mocha';
import { Modules } from '.';
import { CurrencyService } from './currencies';
import DIContainer from '../utils/dicontainer';
import { InstantStorage } from '../utils/instant-storage';
import { WalletService } from './wallet';

import { expect } from "chai";
declare const resetFBLocalStorage:Function;

describe('WalletService', () => {
  const container: DIContainer = new DIContainer();

  container.bind(Modules.INSTANT_STORAGE, new InstantStorage());
  container.bind(Modules.CURRENCIES, new CurrencyService());
  
  const _currencies = container.get(Modules.CURRENCIES);
  _currencies.addCurrency("coins");


  beforeEach(() => {
    resetFBLocalStorage();
  })

  it('is initialized with one currency', async () => {
    const wallet = new WalletService();
    wallet.setContainer(container)._boot();

    const balance = await wallet.getBalance();
    expect(balance).to.have.property("points");
    expect(balance).to.include({points: 0});
  })

  it('should update registered currency balance', async () => {
    const wallet = new WalletService();
    wallet.setContainer(container)._boot();

    const balance = await wallet.updateBalance(10, "points");
    expect(balance).to.have.property("points");
    expect(balance).to.include({points: 10});
  })

  it('should keep same balance if currency does not exist', async () => {
    const wallet = new WalletService();
    wallet.setContainer(container)._boot();
    
    const initialBalance = await wallet.getBalance();
    
    const result = wallet.updateBalance(10, "cash")
    expect(Object.keys(result).length).to.be.equal(0);

    const balance = await wallet.getBalance();
    expect(balance).to.be.deep.equal(initialBalance);
    
    const newBalance = await wallet.updateBalance(10, "coins");
    expect(newBalance).to.be.not.deep.equal(initialBalance);
  })

  it('should add balance correctly', async () => {
    const wallet = new WalletService();
    wallet.setContainer(container)._boot();

    await wallet.updateBalance(1, "points")
    
    let balances:any = await wallet.getBalance();
    let { points } = balances;
    expect(points).to.be.equal(1);

    await wallet.addBalance(15, "points");

    balances = await wallet.getBalance();
    expect(balances).to.be.not.deep.equal({ points: 16 });
  })

});