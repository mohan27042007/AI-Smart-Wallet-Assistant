// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Vault is Ownable, ReentrancyGuard {
    // Events
    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 amount);

    // Constructor: Pass msg.sender to Ownable's constructor (sets initial owner)
    constructor() Ownable(msg.sender) {}

    // Use inherited onlyOwner modifier directly—no custom version needed
    function deposit() public payable {
        require(msg.value > 0, "Must send ETH");
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public onlyOwner nonReentrant {
        require(amount > 0, "Amount must be > 0");
        require(address(this).balance >= amount, "Insufficient balance");
        payable(owner()).transfer(amount);  // Uses Ownable's owner()
        emit Withdraw(msg.sender, amount);
    }

    receive() external payable {
        deposit();
    }
}