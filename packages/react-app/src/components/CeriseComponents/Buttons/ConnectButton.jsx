import React from "react";
import Button from "@material-tailwind/react/Button";
import ConnectGif from "../../../assets/connect.gif";

const ConnectButton = ({ loadWeb3Modal }) => {
  return (
    <Button
      style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4, alignItems: "right" }}
      buttonType="filled"
      size="regular"
      /* type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time */
      onClick={loadWeb3Modal}
    >
      <img style={{ width: 128 }} src={ConnectGif} />
    </Button>
  );
};

export default ConnectButton;
