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
    hardhat: {
      // Default for testing
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};