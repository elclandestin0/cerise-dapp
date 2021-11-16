// import { Button } from "antd";
import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import Address from "../../Address";
import { PageHeader } from "antd";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// CERISE COMPONENTS
import ConnectButton from "../Buttons/ConnectButton";
import MenuButton from "../Buttons/MenuButton";
import CeriseLogo from "../../../assets/ceriselogo.gif";

export default function NavBar({
  address,
  userSigner,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  handleOpen,
}) {
  const modalButtons = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button
          key="logoutbutton"
          style={{ verticalAlign: "top", marginLeft: 8, marginTop: 4 }}
          shape="round"
          size="large"
          onClick={logoutOfWeb3Modal}
        >
          logout
        </Button>,
      );
    } else {
      modalButtons.push(<ConnectButton loadWeb3Modal={loadWeb3Modal} />);
    }
  }

  const { currentTheme } = useThemeSwitcher();

  const display = minimized ? (
    ""
  ) : (
    <span>
      {address ? (
        <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />
      ) : (
        "Connecting..."
      )}
    </span>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <MenuButton handleOpen={handleOpen} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="text-center">
            <img src={CeriseLogo} style={{ width: 64 }} />
          </Typography>
          {display}
          {modalButtons}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const Header = () => {
  return (
    <a href="https://github.com/austintgriffith/scaffold-eth" target="_blank" rel="noopener noreferrer">
      <PageHeader title="CERISE" style={{ cursor: "pointer" }} />
    </a>
  );
};
