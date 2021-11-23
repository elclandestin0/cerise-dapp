// deploy/00_deploy_your_contract.js
const { ethers } = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const ownerz = require("../cryptoadz-ownerz-balances-snapshot.json");

function hashOwner(account) {
  const hash = Buffer.from(
    ethers.utils.solidityKeccak256(["address"], [account]).slice(2),
    "hex"
  );
  return hash;
}

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const merkleTree = new MerkleTree(
    ownerz.map((owner) => hashOwner(owner)),
    keccak256,
    { sortPairs: true }
  );
  const root = merkleTree.getHexRoot();

  await deploy("CeriseCryptoadzV1", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [root],
    log: true,
  });
  getTree = () => {
    return merkleTree;
  };

  /*
    // Getting a previously deployed contract
    const YourContract = await ethers.getContract("YourContract", deployer);
    await YourContract.setPurpose("Hello");
  
    To take ownership of yourContract using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // yourContract.transferOwnership(YOUR_ADDRESS_HERE);

    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  const deployerWallet = ethers.provider.getSigner();
  await deployerWallet.sendTransaction({
    to: "0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17",
    value: ethers.utils.parseEther("100"),
  });

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
};
module.exports.tags = ["CeriseCryptoadzV1"];
