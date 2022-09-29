// react
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

// scaffold hooks
import { useContractLoader } from "eth-hooks";
import { Transactor } from "../../../helpers";

// assets
import Burn from "../../../assets/burn_Cerise.png";
// cerise components
import MintButton from "../Buttons/MintButton";

// material tailwind
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";

// merkle tree stuff
import { MerkleTree } from "merkletreejs";
const keccak256 = require("keccak256");
const tree = require("../../../utils/merkle-tree.json");
import { ethers } from "ethers";

export default function CherryToadz({
  customContract,
  address,
  gasPrice,
  signer,
  provider,
  name,
  chainId,
  contractConfig,
  writeContracts,
}) {
  const tx = Transactor(signer, gasPrice);

  // fix states
  const [tokenId, setTokenId] = useState(1);
  const [ifBurnt, setIfBurnt] = useState(false);
  const contracts = useContractLoader(provider, contractConfig, chainId);

  useEffect(() => {
    if (!address && !contracts) {
      return;
    }

    // const getOwnedTokens = async () => {
    //   await contracts?.["CherryToadz"]?.ownedTokens().then(x => {
    //     return x;
    //   });
    // };
    // getOwnedTokens();
  }, [address, ifBurnt, contracts]);

  // const moveTokenId = forward => {
  //   if (forward) {
  //     if (tokenId == 5) {
  //       setTokenId(1);
  //     } else {
  //       const id = tokenId + 1;
  //       console.log(id);
  //       setTokenId(id);
  //     }
  //   } else {
  //     if (tokenId == 1) {
  //       setTokenId(5);
  //     } else {
  //       const id = tokenId - 1;
  //       console.log(id);
  //       setTokenId(id);
  //     }
  //   }
  // };

  // reconstruct merkletree

  let contract;
  if (!customContract) {
    contract = contracts ? contracts[name] : "";
  } else {
    contract = customContract;
  }
  return (
    <div>
      <div className="bg-burn bg-cover bg-no-repeat bg-center text-primary image-height">
        <div className="pt-72 flex items-center justify-center text-center">
          <img src={Burn} className="w-1/3" />
        </div>
      </div>

      <div>
        <div className="flex justify-center">
          <h1 className="font-h1 text-neonGreen text-4xl px-5 pt-16 text-center text-neonRed">
            <span>Burn</span> Your CherryToad
          </h1>
        </div>

        <div className="flex justify-center pb-5 pt-5 px-10">
          <Card>
            <CardBody>
              <div className="flex justify-center">
                <p className="text-neonGreen text-base font-h1 text-neonGreen text-justify px-3 md:px-24 lg:px-48 xl:px-96">
                  After burning your CherryToad, you may have the physical wearable shipped to your address of choice!
                  Head over to the shipping page after burning to ship it{" "}
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
