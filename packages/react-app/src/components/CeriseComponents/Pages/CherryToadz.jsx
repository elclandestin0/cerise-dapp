// react
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

// scaffold hooks
import { useContractLoader } from "eth-hooks";
import { Transactor } from "../../../helpers";

// assets
import Toadz from "../../../assets/logo";
import left from "../../../assets/toadz_leftarrow.svg";
import right from "../../../assets/toadz_rightarrow.svg";

// cerise components
import MintButton from "../Buttons/MintButton";

// material tailwind
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";

// metadata object
import metadata from "../../../metadata.json";

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
  show,
  price,
  blockExplorer,
  chainId,
  contractConfig,
  writeContracts,
}) {
  const ipfsFolder = `ipfs.io/ipfs/QmYS3HzeGNr5jVbSsRfv9pH7DeinEsvtiTtPuTzD7DBAKR/1`;
  const tx = Transactor(signer, gasPrice);
  
  
  // States to show different mint types on the button
  const [claimable, setClaimable] = useState();
  const [nullAddress, setNullAddress] = useState(false);
  const [isInfernal, setIsInfernal] = useState(false);
  const [isGremplin, setIsGremplin] = useState(false);
  const [isFarokh, setIsFarokh] = useState(false);
  const [isMoti, setIsMoti] = useState(false);
  const [isCerise, setIsCerise] = useState(false);
  const [didMint, setDidMint] = useState(false);
  const [ownedToken, setOwnedToken] = useState(0);
  const [ifOwner, setIfOwner] = useState(false);
  const [ifBurnt, setIfBurnt] = useState("");


  // fix states
  const [tokenId, setTokenId] = useState(1);

  useEffect(() => {
    console.log(tokenId);
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

    const proof = merkleTree.getHexProof(hashOwner(address));
    const leaf = hashOwner(address);
    const root = merkleTree.getHexRoot();
    setNullAddress(false);
    setClaimable(merkleTree.verify(proof, leaf, root));
  }, [address, didMint, ifBurnt, ifOwner]);

  const moveTokenId = (forward) => {
    if (forward) {
      if (tokenId == 5) {
        setTokenId(1);
      } else {
        const id = tokenId + 1;
        console.log(id);
        setTokenId(id);
      }
    } else {
      if (tokenId == 1) {
        setTokenId(5);
      } else {
        const id = tokenId - 1;
        console.log(id);
        setTokenId(id);
      }
    }
  };

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
    await tx(
      writeContracts.CherryToadz.popCherry(proof, {
        value: ethers.utils.parseEther("0.08"),
        gasLimit: 300000,
      }),
    );
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
        <div className="pt-72 flex items-center justify-center text-center">
          <div>
            <img class="" src={Toadz} />
          </div>
        </div>
        {claimable && !didMint && (
          <div>
            <div>
              <p class="text-center text-2xl font-h1 p-4 text-neonGreen">
                {isGremplin
                  ? "Thanks for making the coolest NFT collection ever!"
                  : claimable && isInfernal
                  ? "Thanks for sending me down the NFT rabbit hole!"
                  : claimable && isFarokh
                  ? "Thanks for sharing about TOADZ on Twitter!"
                  : "Thanks for creating the best community ever!"}
                  
              </p>
            </div>
          </div>
        )}
        {claimable && didMint && (
          <div>
            <p class="text-center text-2xl px-5 pt-16 font-h1 p-4">You can only mint once from the V1 collection!</p>
          </div>
        )}
        {!claimable && !nullAddress && !ifBurnt && (
          <div>
            <p class="text-center text-2xl font-h1 p-4 px-5 pt-16">
              Sorry <span class="text-neonYellow text-xl">{address?.substring(0, 6)}</span>! You do not own a toad.{" "}
            </p>
          </div>
        )}
        {!claimable && nullAddress && (
          <div>
            <p class="text-center text-neonGreen text-2xl font-h1 p-4 px-5 pt-16">Login to check if you own a toad!</p>
          </div>
        )}
        {/* <div className="flex justify-center">
          <p className="text-neonGreen text-base font-h1 text-neonGreen text-justify px-3 md:px-24 lg:px-48 xl:px-96">
            There are 22 exclusive street wearables items available to mint for any{" "}
            <a href="https://cryptoadz.io/">CrypTOADZ</a> owners. These include cargo pants, jackets, hoodies and tees.
            Burning your token will allow you to enter your shipping address and get your tokenized street wearable!
          </p>
        </div> */}
        <div className="pt-30 flex items-center justify-center text-center">
          <div>
            <MintButton popCherry={popCherry}>Mint</MintButton>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-center">
          <h1 className="font-h1 text-neonGreen text-4xl px-5 pt-16 text-center text-neonRed">
            <span>22</span> CrypToadz Street Wearables
          </h1>
        </div>

        <div className="flex justify-center pb-5 pt-5 px-10">
        <Card>
          {/* <CardImage
                src={DigFashion}
                alt="Card Image"
            /> */}
          <CardBody>
            <div className="h-full flex items-center justify-center text-center">
              <Button
                onClick={() => {
                  moveTokenId(false);
                }}
              >
              <img style={{width: "50px"}} src={left}/>
              </Button>
              <img src={`https://ipfs.io/ipfs/QmZs8Kn36rEngwHbn6M5WdP6cUvhHP4g2kTj7jFq44vjPs/${tokenId}.gif`}/>
              <Button
                onClick={() => {
                  moveTokenId(true);
                }}
              >
                <img style={{width: "50px"}} src={right}/>
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      </div>

    </div>
  );
}
