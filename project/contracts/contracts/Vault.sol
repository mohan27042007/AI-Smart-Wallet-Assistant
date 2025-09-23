// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Vault {
    address public owner;
    mapping(address => uint256) public balances;

    event Deposit(address indexed from, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;  // Deployer is owner
    }

    // Anyone can deposit ETH
    function deposit() public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // Owner withdraws to any address
    function withdraw(address payable to, uint256 amount) public onlyOwner {
        require(amount > 0, "Withdrawal amount must be greater than 0");
        require(balances[owner] >= amount, "Insufficient balance");
        balances[owner] -= amount;
        to.transfer(amount);
        emit Withdrawal(to, amount);
    }

    // View total contract balance
    function getTotalBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Transfer ownership (for AI upgrades later)
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }
}