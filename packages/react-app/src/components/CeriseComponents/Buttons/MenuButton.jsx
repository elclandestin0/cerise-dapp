import React from "react";
import Button from "@material-tailwind/react/Button";
import MenuIcon from "../../../assets/2.gif";

const MenuButton = ({ handleOpen }) => {
  return (
    <Button size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleOpen}>
      <img src={MenuIcon} style={{ width: 64 }} />
    </Button>
  );
};

export default MenuButton;
