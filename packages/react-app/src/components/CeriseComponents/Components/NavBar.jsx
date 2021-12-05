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
import CeriseLogo from "../../../assets/x.gif";

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
  const display = minimized ? (
    ""
  ) : (
    <span>
      {address ? <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} /> : ""}
    </span>
  );
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <div>
          {display}
          <Button className="font-h1" key="logoutbutton" shape="round" size="large" onClick={logoutOfWeb3Modal}>
            logout
          </Button>
        </div>,
      );
    } else {
      modalButtons.push(
        <div>
          <ConnectButton loadWeb3Modal={loadWeb3Modal} />{" "}
        </div>,
      );
    }
  }

  const { currentTheme } = useThemeSwitcher();

  return (
    <Navbar>
      <NavbarContainer className="pt-4 pb-4">
        <NavItem>
          <MenuButton handleOpen={handleOpen} />
        </NavItem>
        <NavItem>
          <H2 variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={CeriseLogo} style={{ width: 80 }} />
          </H2>
        </NavItem>
        {/* {display} */}
        <NavItem>{modalButtons}</NavItem>
      </NavbarContainer>
    </Navbar>
  );
}

const Header = () => {
  return (
    <a href="https://github.com/austintgriffith/scaffold-eth" target="_blank" rel="noopener noreferrer">
      <PageHeader title="CERISE" style={{ cursor: "pointer" }} />
    </a>
  );
};
