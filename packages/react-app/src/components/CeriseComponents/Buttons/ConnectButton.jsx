import React from "react";
import Button from "@material-tailwind/react/Button";
import ConnectGif from "../../../assets/connect.gif";

const ConnectButton = ({ loadWeb3Modal }) => {
  return (
    <Button
      /* type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time */
      onClick={loadWeb3Modal}
    >
      <img style={{ width: 150 }} src={ConnectGif} />
    </Button>
  );
};

export default ConnectButton;
