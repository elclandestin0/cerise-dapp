// react
import React, { useState, useEffect } from "react";

// scaffold hooks
import { useContractLoader } from "eth-hooks";
import { Transactor } from "../../../helpers";

// assets
import Toadz from "../../../assets/logo";
import DigFashion from "../../../assets/dig-fashion-sample.gif";

// cerise components
import MintButton from "../Buttons/MintButton";

// material tailwind
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";

// merkle tree stuff
import { MerkleTree } from "merkletreejs";
const keccak256 = require("keccak256");
const tree = require("../../../utils/merkle-tree.json");
import { ethers } from "ethers";

export default function RedeemCherryToadz({
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
  const tx = Transactor(signer, gasPrice);

  useEffect(() => {
    if (!address) {
      setNullAddress(true);
      console.log("no address");
      return;
    }
    if (address == "0x7132c9f36abe62eab74cdfdd08c154c9ae45691b") setIsInfernal(true);
    if (address == "0xc5f59709974262c4afacc5386287820bdbc7eb3a") setIsFarokh(true);
    if (address == "0x4298e663517593284ad4fe199b21815bd48a9969") setIsGremplin(true);
    if (address == "0x8bd8795cbeed15f8d5074f493c53b39c11ed37b2") setIsMoti(true);
    if (address == "0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17") setIsCerise(true);

    // checks if whether the user has minted or not
    checkIfMint(address).then(x => {
      setDidMint(x);
    });
    
    // checkOwnedToken(address).then(token => {
    //   // if the user owns a token id of zero, this means the user has transferred the token
    //   if (Number(token.toString()) == 0) return;
    //   setOwnedToken(token);
    //   console.log(token);
    //   // has this user who minted the token burnt it also?
    //   checkIfBurnt(address).then(burnt => {
    //     setIfBurnt(burnt);
    //     checkOwnerOf(token).then(owner => { 
    //       address == owner ? setIfOwner(true) : setIfOwner(false);
    //     });
    //   });
    // });

    // checkIfBurnt(address).then(burnt => {
    //   setIfBurnt(true);
    // })

    console.log("address", address);
    const proof = merkleTree.getHexProof(hashOwner(address));
    const leaf = hashOwner(address);
    const root = merkleTree.getHexRoot();
    setNullAddress(false);
    setClaimable(merkleTree.verify(proof, leaf, root));
  }, [address, didMint, ifBurnt, ifOwner]);


  const checkIfMint = async address => {
    return await writeContracts.CherryToadz.didMint(address);
  };

  const checkOwnedToken = async address => {
    return await writeContracts.CherryToadz.tokenOwned(address);
  };

  const checkOwnerOf = async tokenId => {
    const whoOwns = await writeContracts.CherryToadz.ownerOf(tokenId);
    return whoOwns;
  };

  const checkIfBurnt = async address => {
    return await writeContracts.CherryToadz.didBurn(address);
  };

  const burnToken = async tokenId => {
    await tx(writeContracts.CherryToadz.burn(tokenId));
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
        Redeem CherryToadz
        {/*          {!ifBurnt && ifOwner && (
          <div>
            <div>
              <p class="text-center text-2xl font-h1 p-4 px-5 pt-16">Burn your token!</p>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  burnToken(ownedToken);
                }}
                color="lightBlue"
                buttonType="filled"
                size="lg"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
              >
                Burn Your Token To Receive The IRL CherryToadz
              </Button>
            </div>
          </div>
        )}
        {ifBurnt && (
          <div>
            <div>
              <p class="text-center text-2xl font-h1 p-4 px-5 pt-16">You have already burnt!</p>
            </div>
          </div>
        )}*/}
    </div>
  );
}
