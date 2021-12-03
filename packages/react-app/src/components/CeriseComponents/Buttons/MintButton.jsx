import React from "react";
import Button from "@material-tailwind/react/Button";
import Mint from "../../../assets/mint.gif";

const MintButton = () => {
  return (
    <Button size="large">
      <img src={Mint} style={{ width: 250 }} />
    </Button>
  );
};

export default MintButton;
