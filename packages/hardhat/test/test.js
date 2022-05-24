const hardhat = require("hardhat");
const { use } = require("chai");
var should = require("chai").should();
const { solidity } = require("ethereum-waffle");
const ownerz = require("../cryptoadz-ownerz-balances-snapshot.json");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const { utils } = require("ethers");
const { hrtime } = require("process");

use(solidity);
const ethers = hardhat.ethers;
const { parseUnits } = utils;
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

  describe("CherryToadz", function () {
    it("Should deploy CherryToadz", async function () {
      const CeriseCryptoadz = await ethers.getContractFactory("CherryToadz");
      myContract = await CeriseCryptoadz.deploy(root);
    });
    it("Should not allow anyone to mint before public time", async function () {
      // const cerise = ownerz[0];
      const cerise = "0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17";
      const proof = merkleTree.getHexProof(hashOwner(cerise));
      const amountToPop = parseUnits("0.08", "ether");
      await myContract
        .popCherry(proof, { value: amountToPop.toHexString() })
        .should.be.revertedWith(`MintTimeNotPublic()`);
    });
    it("it allows honorary toadz to mint for a set period of time", async function () {
      const amountToPop = parseUnits("0.08", "ether");
      const timestamp = "1702942620";
      await myContract.setToadzMintTime(timestamp).then(async () => {
        const timeStamp = await myContract.toadz_mint_sale_begin_time();
        console.log("just set the honorary toadz mint time to ", timeStamp);
        await hardhat.network.provider.send("evm_setNextBlockTimestamp", [
          1712942620,
        ]);
        await myContract.popCherry({
          value: amountToPop
            .toHexString()
            .should.be.revertedWith(`MintTimeNotPublic()`),
        });
      });
    });
    it("Should allow someone to mint during public time", async function () {
      // const cerise = ownerz[0];
      const amountToPop = parseUnits("0.08", "ether");
      const timestamp = "1752942620";
      await myContract.setToadzMintTime(timestamp).then(async () => {
        const timeStamp = await myContract.toadz_mint_sale_begin_time();
        console.log("just set the toadz mint time to ", timeStamp);
        await hardhat.network.provider.send("evm_setNextBlockTimestamp", [
          1852942620,
        ]);
        await myContract.popCherry({ value: amountToPop.toHexString() });
      });
    });
    // old tests may delete
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
