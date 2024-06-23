import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

import { INITIAL_SUPPLY, TOKEN_ID, OURAI_AVATAR, resolveAmount } from './helper';

const TOKEN_PRICE = 20;

describe('RaiGallery', () => {
  async function deployRaiGalleryFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Coin = await ethers.getContractFactory('RaiCoin');
    const coin = await Coin.deploy(INITIAL_SUPPLY);

    const Gallery = await ethers.getContractFactory('RaiGallery');
    const gallery = await Gallery.deploy(await coin.getAddress());

    const Nft = await ethers.getContractFactory('RaiE');
    const nft = await Nft.deploy();

    await nft.mint(owner.address, OURAI_AVATAR);

    return { coin, nft, gallery, owner, otherAccount };
  }

  it('Sell an NFT and then buy it', async () => {
    const { coin, nft, gallery, owner, otherAccount } = await loadFixture(deployRaiGalleryFixture);
    const coinDecimals = await coin.decimals();
    const nftContractAddr = await nft.getAddress();
    const galleryContractAddr = await gallery.getAddress();

    const seller = gallery.connect(owner);

    expect(await seller.isListing(nftContractAddr, TOKEN_ID)).to.equal(false);

    const resolvedPrice = resolveAmount(TOKEN_PRICE, coinDecimals);

    await nft.connect(owner).setApprovalForAll(galleryContractAddr, true);
    await seller.sell(nftContractAddr, TOKEN_ID, resolvedPrice);

    expect(await seller.isListing(nftContractAddr, TOKEN_ID)).to.equal(true);
    expect(await nft.ownerOf(TOKEN_ID)).to.equal(owner.address);

    expect(await coin.balanceOf(owner.address)).to.equal(resolveAmount(INITIAL_SUPPLY, coinDecimals));

    const newBalance = resolveAmount(1000, coinDecimals);

    await coin.connect(owner).transfer(otherAccount.address, newBalance);

    expect(await coin.balanceOf(otherAccount.address)).to.equal(newBalance);

    const buyer = gallery.connect(otherAccount);

    await coin.connect(otherAccount).approve(await buyer.getAddress(), resolvedPrice)
    await buyer.buy(nftContractAddr, TOKEN_ID);

    expect(await buyer.isListing(nftContractAddr, TOKEN_ID)).to.equal(false);
    expect(await nft.ownerOf(TOKEN_ID)).to.equal(otherAccount.address);

    expect(await coin.balanceOf(otherAccount.address)).to.equal(newBalance - resolvedPrice);
  });
});
