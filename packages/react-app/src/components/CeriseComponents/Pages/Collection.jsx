import React, { useState } from "react";
import { useContractLoader } from "eth-hooks";

export default function Collection({
  customContract,
  account,
  gasPrice,
  signer,
  provider,
  name,
  show,
  price,
  blockExplorer,
  chainId,
  contractConfig,
}) {
  const contracts = useContractLoader(provider, contractConfig, chainId);
  let contract;
  if (!customContract) {
    contract = contracts ? contracts[name] : "";
  } else {
    contract = customContract;
  }

  const address = contract ? contract.address : "";

  return (
    <div className="flex-grow">
      <div className="flex justify-center">
        <h1 className="text-6xl px-5 pt-32 text-center text-primary">{name}</h1>
      </div>
      <div className="flex justify-center">
        <p className="text-3xl text-justify px-9 md:px-24 lg:px-48 xl:px-96">{address}</p>
      </div>
    </div>
  );
}
