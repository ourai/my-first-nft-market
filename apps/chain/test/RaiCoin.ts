import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

import { INITIAL_SUPPLY, COIN_DECIMALS, resolveAmount } from './helper';

function resolveExpectedTotal(decimals: number | bigint = COIN_DECIMALS) {
  return resolveAmount(INITIAL_SUPPLY, decimals);
}

describe('RaiCoin', () => {
  async function deployRaiCoinFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Coin = await ethers.getContractFactory('RaiCoin');
    const coin = await Coin.deploy(INITIAL_SUPPLY);

    return { coin, owner, otherAccount };
  }

  it('Should set the right initial supply', async () => {
    const { coin } = await loadFixture(deployRaiCoinFixture);
    const decimals = await coin.decimals();

    expect(decimals).to.equal(COIN_DECIMALS, 'The decimals is wrong');
    expect(await coin.totalSupply()).to.equal(resolveExpectedTotal(decimals));
  });

  it('Verify transaction', async () => {
    const { coin, owner, otherAccount } = await loadFixture(deployRaiCoinFixture);
    const initialOwnerBalance = await coin.balanceOf(owner.address);

    expect(initialOwnerBalance).to.equal(resolveExpectedTotal());
    expect(await coin.balanceOf(otherAccount.address)).to.equal(0);

    const amount = BigInt(resolveAmount(10));

    await coin.transfer(otherAccount.address, amount);

    expect(await coin.balanceOf(otherAccount.address)).to.equal(amount);
    expect(await coin.balanceOf(owner.address)).to.equal(initialOwnerBalance - amount);
  });
});
