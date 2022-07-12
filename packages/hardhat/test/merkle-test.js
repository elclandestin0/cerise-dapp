const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const ownerz = require("../cryptoadz-ownerz-balances-snapshot.json");

use(solidity);

function hashOwner(account) {
  const hash = Buffer.from(
    ethers.utils.solidityKeccak256(["address"], [account]).slice(2),
    "hex"
  );
  return hash;
}

describe("My Dapp", function () {
  let merkleTree;
  let root;
  let accounts;
  before(async function () {
    accounts = await ethers.getSigners();
    merkleTree = new MerkleTree(
      ownerz.map((owner) => hashOwner(owner)),
      keccak256,
      { sortPairs: true }
    );
    root = merkleTree.getHexRoot();
    console.log(root);
  });

  describe("CherryToadz", function () {
    it("Should deploy CherryToadz", async function () {
      const CeriseCryptoadz = await ethers.getContractFactory("CherryToadz");
      await CeriseCryptoadz.deploy(root);
    });
    it("Should mint from accounts[0]", async function () {
      const cerise = accounts[0];
      const CeriseCryptoadz = await ethers.getContractFactory("CherryToadz");
      const myContract = await CeriseCryptoadz.deploy(root);
      const proof = merkleTree.getHexProof(hashOwner(cerise));
      const amountToPop = ethers.utils.parseUnits("0.08", "ether");
      await myContract.popCherry(proof, { value: amountToPop.toString() });
      expect(await myContract.ownerOf(1)).to.equal(cerise);
    });
    // it("Should not mint from cerise.eth", async function () {
    //   const cerise = "0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17";
    //   const proof = merkleTree.getHexProof(hashOwner(cerise));
    //   await expect(myContract.popCherry(proof)).to.be.revertedWith(
    //     "Invalid merkle proof"
    //   );
    // });
    // it("Should not mint from yazanator address", async function () {
    //   const otherAccount = "0x31ca6ca7f7a3298bc6c5103aa45847f34e382a1c";
    //   const proof = merkleTree.getHexProof(hashOwner(otherAccount));
    //   await expect(myContract.popCherry(proof)).to.be.revertedWith(
    //     "Invalid merkle proof"
    //   );
    // });
  });
});
