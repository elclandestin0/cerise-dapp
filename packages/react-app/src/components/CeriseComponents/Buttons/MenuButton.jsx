import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "../../../assets/menubutton.gif";

const MenuButton = ({ handleOpen }) => {
  return (
    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleOpen}>
      <img src={MenuIcon} style={{ width: 64 }} />
    </IconButton>
  );
};

export default MenuButton;
