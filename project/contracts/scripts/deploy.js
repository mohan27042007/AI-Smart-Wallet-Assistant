const { ethers } = require("hardhat");

async function main() {
  // Get deployer (first account)
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy Vault contract (no constructor args)
  const Vault = await ethers.getContractFactory("Vault");
  const vault = await Vault.deploy();
  await vault.deployed();  // v2: Wait for deployment (replaces waitForDeployment)

  console.log("Vault deployed to:", vault.address);  // v2: Use .address (replaces getAddress)

  // Optional: Log for verification (manual on Etherscan later)
  console.log("Deployment transaction:", vault.deployTransaction.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });