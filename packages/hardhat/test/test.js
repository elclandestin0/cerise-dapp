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
      ceriseContract = await Cerise.deploy(scoreboardContract.address);
    });

    it("Should count a scoreboard point for every cherrytoad mint", async () => {
      const rand = [0, 1, 2, 3, 4];
      rand.forEach(async (element) => {
        await myContract.popCherry();
      });
      const txCall = await scoreboardContract.amountMinted(accounts[0].address);
      expect(txCall).to.equal(5);
    });

    it("Can mint a sock", async () => {
      await ceriseContract.mintSockz();
      const sockzAmount = await ceriseContract.sockzAmount();
      expect(sockzAmount).to.equal(24);
    });

    it("Can mint a tuque", async () => {
      await ceriseContract.mintTuque();
      const sockzAmount = await ceriseContract.tuqueAmount();
      expect(sockzAmount).to.equal(14);
    });

    it("Cannot mint a Tee", async () => {
      await expect(ceriseContract.mintTee()).to.be.reverted;
    });
  });
});
