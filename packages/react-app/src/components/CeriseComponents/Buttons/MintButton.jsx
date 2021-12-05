import React from "react";
import Button from "@material-tailwind/react/Button";
import Mint from "../../../assets/mint.gif";

const MintButton = ({ popCherry }) => {
  return (
    <Button size="large" onClick={popCherry}>
      <img src={Mint} style={{ width: 250 }} />
    </Button>
  );
};

export default MintButton;
