import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "../../assets/menubutton.gif";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Contract } from "../../components";

const MenuButton = ({ handleOpen }) => {
  return (
    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleOpen}>
      <img src={MenuIcon} style={{ width: 64 }} />
    </IconButton>
  );
};

export default MenuButton;
