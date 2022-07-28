// react
import React, { useState, useEffect } from "react";

// scaffold hooks
import { useContractLoader } from "eth-hooks";
import { Transactor } from "../../../helpers";

// assets
import Toadz from "../../../assets/logo";
// cerise components
import MintButton from "../Buttons/MintButton";

// material tailwind
import Card from "@material-tailwind/react/Card";
import CardBody from "@material-tailwind/react/CardBody";

import { ethers } from "ethers";
import { useMemo } from "react";

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
  const [isInfernal, setIsInfernal] = useState(false);
  const [isGremplin, setIsGremplin] = useState(false);
  const [isFarokh, setIsFarokh] = useState(false);
  const [isMoti, setIsMoti] = useState(false);
  const [isCerise, setIsCerise] = useState(false);
  const [isCozomo, setIsCozomo] = useState(false);
  // fix states

  const contracts = useContractLoader(provider, contractConfig, chainId);

  const isPublicSale = useMemo(async () => {
    return await contracts?.["CherryToadz"].isPublicSale();
  }, [contracts]);

  const didMint = useMemo(async () => {
    return await contracts?.["CherryToadz"].didMint(address);
  }, [contracts]);

  const getBalance = useMemo(async () => {
    await contracts?.["CherryToadz"].balanceOf(address).then(x => {
      return x;
    });
  }, [contracts, address]);

  const popCherry = async () => {
    await tx(
      writeContracts.CherryToadz.popCherry({
        value: ethers.utils.parseEther("0.1"),
        gasLimit: 300000,
      }),
    );
  };

  useEffect(() => {
    if (!address && !contracts) {
      return;
    }
    if (address === "0x7132c9f36abe62eab74cdfdd08c154c9ae45691b") setIsInfernal(true);
    if (address === "0xc5f59709974262c4afacc5386287820bdbc7eb3a") setIsFarokh(true);
    if (address === "0x4298e663517593284ad4fe199b21815bd48a9969") setIsGremplin(true);
    if (address === "0xCe90a7949bb78892F159F428D0dC23a8E3584d75") setIsCozomo(true);
    if (address === "0x8bd8795cbeed15f8d5074f493c53b39c11ed37b2") setIsMoti(true);
    if (address === "0xe0110C6EE2138Ecf9962a6f9f6Ad329cDFE1FA17") setIsCerise(true);
  }, [address, contracts]);

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
            <img src={Toadz} />
          </div>
        </div>
        {address && (
          <div>
            <div>
              <p class="text-center text-2xl font-h1 p-4 text-neonGreen">
                {isGremplin && !didMint
                  ? "Thanks for making the coolest NFT collection ever!"
                  : isInfernal && !didMint
                  ? "Thanks for sending us down the NFT rabbit hole!"
                  : isFarokh && !didMint
                  ? "Thanks for sharing about TOADZ on Twitter!"
                  : isMoti && !didMint
                  ? "Thanks for creating the best community ever!"
                  : isCozomo && !didMinte
                  ? "Thanks for being buying a Toadenza and for being an awesome force of culture!"
                  : isCerise && !didMint
                  ? "I'd like to thank me for being me!"
                  : isPublicSale && !didMint
                  ? `Croak! }`
                  : isPublicSale && didMint
                  ? `Croak! You have ${getBalance.toString()} clothes you can redeem!`
                  : "The Uncroakening"}
              </p>
            </div>
            <div className="pt-30 flex items-center justify-center text-center">
              <div>
                <MintButton popCherry={popCherry} />
              </div>
            </div>
          </div>
        )}
        {!address && (
          <div>
            <p class="text-center text-neonGreen text-2xl font-h1 p-4 px-5 pt-16">Login to mint a CherryToad!</p>
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-center">
          <h1 className="font-h1 text-neonGreen text-4xl px-5 pt-16 text-center text-neonRed">
            CrypToadz Street Wearables
          </h1>
        </div>

        <div className="flex justify-center pb-5 pt-5 px-10">
          <Card>
            <CardBody>
              <div className="flex justify-center">
                <p className="text-neonGreen text-base font-h1 text-neonGreen text-justify px-3 md:px-24 lg:px-48 xl:px-96">
                  There are 22 exclusive street wearables items available to mint for any{" "}
                  <a href="https://cryptoadz.io/">CrypTOADZ</a> owners. These include pants, jackets, hoodies, tees and
                  accessories. Burning your token will allow you to enter your shipping address and get your tokenized
                  street wearable!
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
