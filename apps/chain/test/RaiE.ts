import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

import { TOKEN_ID, OURAI_AVATAR } from './helper';

describe('RaiE', () => {
  async function deployRaiEFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Nft = await ethers.getContractFactory('RaiE');
    const nft = await Nft.deploy();

    return { nft, owner, otherAccount };
  }

  it('Check whether mint successfully', async () => {
    const { nft, owner } = await loadFixture(deployRaiEFixture);

    await nft.mint(owner.address, OURAI_AVATAR);

    expect(await nft.ownerOf(TOKEN_ID)).to.equal(owner.address);
    expect(await nft.tokenURI(TOKEN_ID)).to.equal(OURAI_AVATAR);
  });
});
