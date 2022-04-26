import { task } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';

task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

const config = {
  solidity: {
    version: '0.8.4',
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/a3da368aad8541a599365cd0b741ed66',
      accounts: [
        '39d786b13af9edb52dc2e9da3ed14d9e4b00ac2199b7bfebdd1e36ca6f2c4686',
      ],
    },
  },
};
export default config;
