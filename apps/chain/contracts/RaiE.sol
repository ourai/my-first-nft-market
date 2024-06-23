// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { ERC721URIStorage, ERC721 } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RaiE is ERC721URIStorage {
  uint256 private _totalCount;

  constructor() ERC721("RaiE", "RAIE") {}

  function mint(address to, string memory tokenUrl) external returns (uint256) {
    uint256 tokenId = ++_totalCount;

    _safeMint(to, tokenId);
    _setTokenURI(tokenId, tokenUrl);

    return tokenId;
  }
}
