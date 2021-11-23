const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");
const ownerz = require("../cryptoadz-ownerz-balances-snapshot.json");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

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
    const fs = require("fs");
    fs.writeFile("merkle-tree.json", JSON.stringify(merkleTree), (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
  });

  describe("CeriseCryptoadzV1", function () {
    it("Should deploy CeriseCryptoadzV1", async function () {
      const CeriseCryptoadz = await ethers.getContractFactory(
        "CeriseCryptoadzV1"
      );

      myContract = await CeriseCryptoadz.deploy(root);
    });
    it("Should mint from accounts[0]", async function () {
      const cerise = ownerz[0];
      const proof = merkleTree.getHexProof(hashOwner(cerise));
      await myContract.popCherry(proof);
      expect(await myContract.ownerOf(1)).to.equal(cerise);
    });
    it("Should not mint from cerise.eth", async function () {
      const cerise = "0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17";
      const proof = merkleTree.getHexProof(hashOwner(cerise));
      await expect(myContract.popCherry(proof)).to.be.revertedWith(
        "Invalid merkle proof"
      );
    });
    it("Should not mint from InfernalToast.eth", async function () {
      const infernalToast = "0x7132C9f36abE62EAb74CdfDd08C154c9AE45691B";
      const proof = merkleTree.getHexProof(hashOwner(infernalToast));
      await expect(myContract.infernalToastMint(proof)).to.be.revertedWith(
        "Only InfernalToast can mint!"
      );
    });
    it("Should not mint from yazanator address", async function () {
      const otherAccount = "0x31ca6ca7f7a3298bc6c5103aa45847f34e382a1c";
      const proof = merkleTree.getHexProof(hashOwner(otherAccount));
      await expect(myContract.popCherry(proof)).to.be.revertedWith(
        "Invalid merkle proof"
      );
    });
  });
});
