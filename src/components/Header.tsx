import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import AuthMenu from "./AuthMenu";
import { IProps } from "../App";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentUser = useSelector((state: IProps) => state.currentUser);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar className="navbar">
        <Typography variant="h6">NY Times Titles </Typography>
        <IconButton
          edge="start"
          color="inherit"
          className="avatarBtn"
          aria-controls="logout-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <Avatar src={currentUser?.photoURL || ""} />
        </IconButton>
        <Menu
          className="auth-menu"
          id="auth-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <AuthMenu setAnchorEl={setAnchorEl} />
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
