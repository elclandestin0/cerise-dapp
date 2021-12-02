import React from "react";

const Collections = () => {
  const collectionsAddresses = ["0x5fbdb2315678afecb367f032d93f642f64180aa3"];
  return (
    <div className="flex-grow">
      <div className="flex justify-center">
        <h1 className="font-h1 text-5xl px-5 pt-32 text-center text-neonBlue">Collections</h1>
      </div>
      <div className="flex justify-center">
        <p className="text-3xl text-justify px-9 md:px-24 lg:px-48 xl:px-96">Collections</p>
      </div>
    </div>
  );
};

export default Collections;
