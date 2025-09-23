const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault", function () {
  let vault, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("Vault");
    vault = await Vault.deploy();
    await vault.deployed();  // v5: Use deployed() instead of waitForDeployment()
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await vault.owner()).to.equal(owner.address);
    });
  });

  describe("Deposits and Withdraws", function () {
    it("Should allow owner to deposit ETH", async function () {
      const depositAmount = ethers.utils.parseEther("1.0");  // v5: utils.parseEther
      await expect(vault.connect(owner).deposit({ value: depositAmount }))
        .to.emit(vault, "Deposit")
        .withArgs(owner.address, depositAmount);
      expect(await ethers.provider.getBalance(vault.address)).to.equal(depositAmount);  // v5: vault.address
    });

    it("Should allow owner to withdraw ETH", async function () {
      const depositAmount = ethers.utils.parseEther("1.0");
      await vault.connect(owner).deposit({ value: depositAmount });
      await expect(vault.connect(owner).withdraw(depositAmount))
        .to.emit(vault, "Withdraw")
        .withArgs(owner.address, depositAmount);
      expect(await ethers.provider.getBalance(vault.address)).to.equal(0);
    });

    it("Should revert if non-owner tries to withdraw", async function () {
      const depositAmount = ethers.utils.parseEther("1.0");
      await vault.connect(owner).deposit({ value: depositAmount });
      await expect(vault.connect(addr1).withdraw(depositAmount)).to.be.revertedWith(
        "Only owner can withdraw"
      );
    });
  });
});