import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

import { INITIAL_SUPPLY, TOKEN_ID, TOKEN_ID_2ND, OURAI_AVATAR, resolveAmount } from './helper';

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

    const minter = nft.connect(owner);

    await minter.mint();
    await minter.mint();
    await minter.mint();
    await minter.setApprovalForAll(await gallery.getAddress(), true);

    return { coin, nft, gallery, owner, otherAccount };
  }

  it('List, unlist and re-list an NFT', async () => {
    const { coin, nft, gallery, owner } = await loadFixture(deployRaiGalleryFixture);

    const nftContractAddr = await nft.getAddress();
    const seller = gallery.connect(owner);

    expect(await gallery.isListing(nftContractAddr, TOKEN_ID)).to.equal(false);
    expect((await gallery.getAll()).length).to.equal(0, 'Amount of NFTs in gallery is not 0.');

    const coinDecimals = await coin.decimals();
    const resolvedPrice = resolveAmount(TOKEN_PRICE, coinDecimals);

    // list an NFT
    await seller.sell(nftContractAddr, TOKEN_ID, resolvedPrice, OURAI_AVATAR);
    expect(await gallery.isListing(nftContractAddr, TOKEN_ID)).to.equal(true);
    expect((await gallery.getAll()).length).to.equal(1);

    // unlist the NFT
    await seller.unlist(nftContractAddr, TOKEN_ID);
    expect(await gallery.isListing(nftContractAddr, TOKEN_ID)).to.equal(false);
    expect((await gallery.getAll()).length).to.equal(1);

    // list the NFT again
    await seller.sell(nftContractAddr, TOKEN_ID, resolvedPrice, OURAI_AVATAR);
    expect(await gallery.isListing(nftContractAddr, TOKEN_ID)).to.equal(true);
    expect((await gallery.getAll()).length).to.equal(1);
  });

  it('Sell an NFT and then buy it', async () => {
    const { coin, nft, gallery, owner, otherAccount } = await loadFixture(deployRaiGalleryFixture);

    const nftContractAddr = await nft.getAddress();
    const seller = gallery.connect(owner);
    const buyer = gallery.connect(otherAccount);

    const coinDecimals = await coin.decimals();
    const resolvedPrice = resolveAmount(TOKEN_PRICE, coinDecimals);

    // list an NFT
    await seller.sell(nftContractAddr, TOKEN_ID, resolvedPrice, OURAI_AVATAR);
    expect(await nft.ownerOf(TOKEN_ID)).to.equal(owner.address);
    expect(await gallery.isListing(nftContractAddr, TOKEN_ID)).to.equal(true);

    // list another NFT
    await seller.sell(nftContractAddr, TOKEN_ID_2ND, resolvedPrice, OURAI_AVATAR);
    expect(await nft.ownerOf(TOKEN_ID_2ND)).to.equal(owner.address);
    expect(await gallery.isListing(nftContractAddr, TOKEN_ID_2ND)).to.equal(true);

    expect(await coin.balanceOf(owner.address)).to.equal(resolveAmount(INITIAL_SUPPLY, coinDecimals));

    // transfer 1000 RAIC from seller to buyer
    const newBalance = resolveAmount(1000, coinDecimals);
    await coin.connect(owner).transfer(otherAccount.address, newBalance);
    expect(await coin.balanceOf(otherAccount.address)).to.equal(newBalance);

    // buy the first NFT
    await coin.connect(otherAccount).approve(await buyer.getAddress(), resolvedPrice);
    await buyer.buy(nftContractAddr, TOKEN_ID);
    expect(await nft.ownerOf(TOKEN_ID)).to.equal(otherAccount.address);
    expect(await gallery.isListing(nftContractAddr, TOKEN_ID)).to.equal(false);
    expect(await gallery.isListing(nftContractAddr, TOKEN_ID_2ND)).to.equal(true);
    expect(await coin.balanceOf(otherAccount.address)).to.equal(newBalance - resolvedPrice);
  });
});
