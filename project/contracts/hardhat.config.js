require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUser Config */
module.exports = {
  solidity: {
    version: "0.8.24",  // Updated: Supports OpenZeppelin v5 (^0.8.20)
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    sepolia: {
        url: "https://eth-sepolia.g.alchemy.com/v2/g3MbG-3AQ2cJcUcoqiPIA",  // Replace with your key
        accounts: ["1Ec1f1EA2dA52238808a8223CEC0B3Fe8bc41Cc4"]  // Replace with your wallet's private key (no 0x prefix)
    }
  },
  etherscan: {
    apiKey: "1BRQYW5Z7CRP6ZZ29WWW3TKYRVHBKDA4FK"  // For verification (get free from etherscan.io/apis)
  }
};  