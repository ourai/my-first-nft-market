// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract RaiGallery is ReentrancyGuard {
  struct NftItem {
    address seller;
    address nftContract;
    uint tokenId;
    uint256 price;
    bool listing;
  }

  IERC20 private _payment;

  mapping(address => mapping(uint256 => NftItem)) private _listedNfts;

  event NftListed(
    address indexed seller,
    address indexed nftContract,
    uint256 indexed tokenId,
    uint256 price
  );

  event NftSold(
    address indexed buyer,
    address indexed nftContract,
    uint256 indexed tokenId,
    uint256 price
  );

  constructor(address coinAddr_) {
    _payment = IERC20(coinAddr_);
  }

  function isListing(address nftContract, uint256 tokenId) external view returns (bool) {
    return _listedNfts[nftContract][tokenId].listing;
  }

  function sell(address nftContract, uint256 tokenId, uint256 price) external {
    IERC721 nft = IERC721(nftContract);
    address seller = msg.sender;

    require(nft.ownerOf(tokenId) == seller, "You're not the owner of the NFT.");
    require(price > 0, "Price must be greater thant 0.");
    require(nft.isApprovedForAll(seller, address(this)), "Contract isn't approved.");

    _listedNfts[nftContract][tokenId] = NftItem(seller, nftContract, tokenId, price, true);

    emit NftListed(seller, nftContract, tokenId, price);
  }

  function buy(address nftContract, uint256 tokenId) external nonReentrant {
    NftItem storage targetNft = _listedNfts[nftContract][tokenId];

    require(targetNft.listing, "NFT isn't listed for sale.");

    address buyer = msg.sender;

    require(_payment.transferFrom(buyer, targetNft.seller, targetNft.price), "Payment for NFT failed.");

    IERC721 nft = IERC721(nftContract);

    nft.safeTransferFrom(targetNft.seller, buyer, tokenId);

    targetNft.listing = false;

    emit NftSold(buyer, nftContract, tokenId, targetNft.price);
  }
}
