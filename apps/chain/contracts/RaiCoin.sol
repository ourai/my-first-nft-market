// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RaiCoin is ERC20("RaiCoin", "RAIC") {
  constructor(uint256 initialValue) {
    _mint(msg.sender, initialValue);
  }
}
