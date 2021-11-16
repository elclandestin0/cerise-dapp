// import { Button } from "antd";
import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import Address from "../../Address";
import { PageHeader } from "antd";
import H2 from "@material-tailwind/react/Heading1";
import Button from "@material-tailwind/react/Button";

// CERISE COMPONENTS
import ConnectButton from "../Buttons/ConnectButton";
import MenuButton from "../Buttons/MenuButton";
import CeriseLogo from "../../../assets/ceriselogo.gif";

// tailwind material
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavItem from "@material-tailwind/react/NavItem";

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
    <NavbarContainer>
      <MenuButton handleOpen={handleOpen} />
      <H2 variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <img src={CeriseLogo} style={{ width: 64 }} />
      </H2>
      {/* {display} */}
      {modalButtons}
    </NavbarContainer>
  );
}

const Header = () => {
  return (
    <a href="https://github.com/austintgriffith/scaffold-eth" target="_blank" rel="noopener noreferrer">
      <PageHeader title="CERISE" style={{ cursor: "pointer" }} />
    </a>
  );
};
