const hardhat = require("hardhat");
const { use, expect } = require("chai");
const should = require("chai").should();
const { solidity } = require("ethereum-waffle");
const { utils } = require("ethers");

use(solidity);
const ethers = hardhat.ethers;
const { parseUnits } = utils;

const sign = (address, data) => {
  return hardhat.network.provider.send("eth_sign", [
    address,
    ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data)),
  ]);
};

describe("CherryToadz", function () {
  let accounts;
  let myContract;
  let ceriseContract;
  let scoreboardContract;

  before(async function () {
    accounts = await ethers.getSigners(2);
  });

  describe.only("CherryToadz", function () {
    it("Should deploy all contracts", async function () {
      const CeriseCryptoadz = await ethers.getContractFactory("CherryToadz");
      const Scoreboard = await ethers.getContractFactory("Scoreboard");
      const Cerise = await ethers.getContractFactory("CeriseDayOnez");
      scoreboardContract = await Scoreboard.deploy();
      myContract = await CeriseCryptoadz.deploy(scoreboardContract.address);
      ceriseContract = await Cerise.deploy();
    });
    it("Should count a scoreboard point for every cherrytoad mint", async () => {
      const tx = await myContract.popCherry();
      const receipt = await tx.wait();
      console.log(
        receipt.events?.filter((x) => {
          return x.event == "MintCounted";
        })
      );
      console.log(tx);
      const txCall = await myContract.score();
      expect(txCall).to.equal(1);
    });
  });
});
