import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

import { TOKEN_ID, TOKEN_ID_2ND, TOKEN_ID_3RD } from './helper';

describe('RaiE', () => {
  async function deployRaiEFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Nft = await ethers.getContractFactory('RaiE');
    const nft = await Nft.deploy();

    return { nft, owner, otherAccount };
  }

  it('Check whether mint successfully', async () => {
    const { nft, owner } = await loadFixture(deployRaiEFixture);

    expect(await nft.balanceOf(owner)).to.equal(0);

    const minter = nft.connect(owner);

    await minter.mint();
    expect(await nft.balanceOf(owner)).to.equal(1);

    await minter.mint();
    expect(await nft.balanceOf(owner)).to.equal(2);

    await minter.mint();
    expect(await nft.balanceOf(owner)).to.equal(3);

    expect(await nft.ownerOf(TOKEN_ID)).to.equal(owner.address);
    expect(await nft.ownerOf(TOKEN_ID_2ND)).to.equal(owner.address);
    expect(await nft.ownerOf(TOKEN_ID_3RD)).to.equal(owner.address);
  });
});
