import React, { useState, useEffect } from "react";
import { useContractLoader } from "eth-hooks";
// assets
import DemonSplayerz from "../../../assets/DS.png";
import DigFashion from "../../../assets/dig-fashion-sample.gif";

// material tailwind
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import { Button } from "antd";

// merkle tree stuff
import { MerkleTree } from "merkletreejs";
const keccak256 = require("keccak256");
const tree = require("../../../utils/merkle-tree.json");
import { ethers } from "ethers";

export default function Collection({
  customContract,
  address,
  gasPrice,
  signer,
  provider,
  name,
  show,
  price,
  blockExplorer,
  chainId,
  contractConfig,
  writeContracts,
}) {
  // States to show different mint types on the button
  const [claimable, setClaimable] = useState();
  const [isInfernal, setIsInfernal] = useState(false);
  const [isGremplin, setIsGremplin] = useState(false);
  const [isFarokh, setIsFarokh] = useState(false);
  const [isMoti, setIsMoti] = useState(false);
  const [isCerise, setIsCerise] = useState(false);

  useEffect(() => {
    if (!address) {
      console.log("no address");
      return;
    }
    if (address == "0x7132c9f36abe62eab74cdfdd08c154c9ae45691b") setIsInfernalToast(true);
    if (address == "0xc5f59709974262c4afacc5386287820bdbc7eb3a") setIsFarokh(true);
    if (address == "0x4298e663517593284ad4fe199b21815bd48a9969") setIsGremplin(true);
    if (address == "0x8bd8795cbeed15f8d5074f493c53b39c11ed37b2") setIsMoti(true);
    if (address == "0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17") setIsCerise(true);
    const proof = merkleTree.getHexProof(hashOwner(address));
    const leaf = hashOwner(address);
    const root = merkleTree.getHexRoot();
    console.log(claimable);
    console.log(address);
    setClaimable(merkleTree.verify(proof, leaf, root));
  }, [address]);
  // reconstruct merkletree
  const merkleTree = new MerkleTree(
    tree.leaves.map(leaf => Buffer.from(leaf.data)),
    keccak256,
    { sortPairs: true },
  );

  const hashOwner = owner => {
    return Buffer.from(ethers.utils.solidityKeccak256(["address"], [owner]).slice(2), "hex");
  };

  const popCherry = async () => {
    const proof = merkleTree.getHexProof(hashOwner(address));
    await writeContracts.CeriseCryptoadzV1.popCherry(proof);
  };

  const contracts = useContractLoader(provider, contractConfig, chainId);
  let contract;
  if (!customContract) {
    contract = contracts ? contracts[name] : "";
  } else {
    contract = customContract;
  }
  return (
    <div>
      <div className="bg-test bg-cover bg-no-repeat bg-center text-primary image-height">
        <div className="h-full flex items-center justify-center text-center">
          <img class="tiny:w-1/4 md:w-1/2 lg:w-1/2 xl:w-1/2" src={DemonSplayerz} />
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="text-6xl px-5 pt-16 text-center text-primary">{name}</h1>
      </div>
      <div className="flex justify-center">
        <p className="text-3xl text-justify px-9 md:px-24 lg:px-48 xl:px-96">
          <Button
            onClick={() => {
              popCherry();
            }}
          >
            {claimable && isGremplin
              ? "!vibe"
              : claimable && isInfernal
              ? "!tech"
              : claimable && isFarokh
              ? "!rug"
              : claimable && isMoti
              ? "!moti"
              : claimable && isCerise
              ? "!cherry"
              : claimable
              ? "!pop"
              : "Sorry, you don't own a toad!"}
          </Button>
        </p>
      </div>
      <div className="flex justify-center pb-5 pt-5 px-10">
        <Card className="bg-footer">
          <CardBody>
            <div className="h-full flex items-center justify-center text-center">
              <img class="tiny:w-1/4 md:w-1/2 lg:w-1/2 xl:w-1/2" src={DigFashion} />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
