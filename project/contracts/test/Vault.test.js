const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault", function () {
  let vault, owner, addr1;
  let Vault;  // Factory reference

  before(async function () {
    Vault = await ethers.getContractFactory("Vault");  // Get factory once, outside hooks
  });

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    vault = await Vault.deploy();  // Deploy—resolves after mining, no extra wait needed
    // Remove: await vault.waitForDeployment();  // This line caused the error
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const contractOwner = await vault.owner();
      expect(contractOwner).to.equal(owner.address);
    });
  });

  describe("Deposits and Withdraws", function () {
    it("Should allow owner to deposit ETH", async function () {
      const depositAmount = ethers.utils.parseEther("1.0");
      await vault.connect(owner).deposit({ value: depositAmount });
      const balance = await ethers.provider.getBalance(vault.address);  // New: v5-compatible
      expect(balance).to.equal(depositAmount);
    });

    it("Should allow owner to withdraw ETH", async function () {
      const depositAmount = ethers.utils.parseEther("1.0");
      await vault.connect(owner).deposit({ value: depositAmount });
      const initialBalance = await ethers.provider.getBalance(owner.address);
      await vault.connect(owner).withdraw(depositAmount);
      const finalBalance = await ethers.provider.getBalance(owner.address);
      expect(finalBalance).to.be.gt(initialBalance);
    });

    it("Should revert if non-owner tries to withdraw", async function () {
      const depositAmount = ethers.utils.parseEther("1.0");
      await vault.connect(owner).deposit({ value: depositAmount });
      await expect(vault.connect(addr1).withdraw(depositAmount))
        .to.be.revertedWithCustomError(Vault, "OwnableUnauthorizedAccount");  // OZ v5 custom error
    });
  });
});