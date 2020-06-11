import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import AuthMenu from "./AuthMenu";
import { IStoreState } from "../redux/store";

interface IHeader {
  currentUser: firebase.User;
}

const Header = (props: IHeader) => {
  const { currentUser } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
const mapsStateToProps = (state: IStoreState) => {
  return {
    currentUser: state.login.currentUser,
  };
};
export default connect(mapsStateToProps)(Header);
