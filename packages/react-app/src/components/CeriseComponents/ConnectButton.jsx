import React from "react";
import Button from "@mui/material/Button";
import ConnectGif from "../../assets/connect.gif";

const ConnectButton = ({ loadWeb3Modal }) => {
  return (
    <Button
      key="loginbutton"
      style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4, alignItems: "right" }}
      shape="round"
      size="large"
      /* type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time */
      onClick={loadWeb3Modal}
    >
      <img style={{ width: 128 }} src={ConnectGif} />
    </Button>
  );
};

export default ConnectButton;
