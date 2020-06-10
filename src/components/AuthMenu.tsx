import React, { useState } from "react";
import { useSelector } from "react-redux";
import { googleLogin, logIn, signUp, logOut } from "../services/auth";
import {
  Typography,
  TextField,
  Button,
  Link,
  MenuItem,
} from "@material-ui/core";
import GoogleButton from "react-google-button";
import { IProps } from "../App";

interface IAuthData {
  email: string;
  password: string;
}
interface IAuthMenu {
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement>>;
}
interface IMenu extends IAuthMenu {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginMenu = (props: IMenu) => {
  const { setRegister, setAnchorEl } = props;
  const [errorMessage, setErrorMessage] = useState("");

  const handleGoogleSignIn = () => {
    googleLogin(
      () => {
        console.log("Logged in with Google");
        setAnchorEl(null);
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };

  const handleLogIn = (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    let object: IAuthData = { email: "", password: "" };
    data.forEach((value, key) => {
      object[key] = value;
    });
    logIn(
      object.email,
      object.password,
      () => {
        console.log("Logged in");
        setAnchorEl(null);
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };
  return (
    <div>
      <Typography variant="h6">Login</Typography>
      <form onSubmit={handleLogIn} id="login-form">
        <TextField
          name="email"
          type="email"
          error={errorMessage.includes("Invalid email")}
          label="Email"
          required
        >
          {" "}
        </TextField>
        <TextField
          error={errorMessage.includes("The password is invalid")}
          name="password"
          label="Password"
          type="password"
          required
        >
          {" "}
        </TextField>
        <Button
          id="login-btn"
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
        <Typography className="error-msg" color="error" variant="caption">
          {errorMessage}
        </Typography>
      </form>
      <GoogleButton
        className="google-btn"
        onClick={handleGoogleSignIn}
        type="light"
      ></GoogleButton>
      <Link
        onClick={() => {
          setRegister(true);
        }}
        className="create-account-button"
        component="button"
        variant="body2"
      >
        Create account
      </Link>
    </div>
  );
};
const RegisterMenu = (props: IMenu) => {
  const { setRegister, setAnchorEl } = props;

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    let object: IAuthData = { email: "", password: "" };
    data.forEach((value, key) => {
      object[key] = value;
    });
    signUp(
      object.email,
      object.password,
      () => {
        console.log("Logged in with Google");
        setAnchorEl(null);
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };
  const handleGoogleSignIn = () => {
    googleLogin(
      () => {
        console.log("Signed up with Google");
        setAnchorEl(null);
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };
  return (
    <div>
      <Typography variant="h6">Sign Up</Typography>
      <form onSubmit={handleSignUp} id="login-form">
        <TextField
          error={errorMessage.includes("mail")}
          name="email"
          type="email"
          label="Email"
          required
        >
          {" "}
        </TextField>
        <TextField
          error={errorMessage.includes("Weak password")}
          name="password"
          label="Password"
          type="password"
          required
        >
          {" "}
        </TextField>
        <Button
          id="login-btn"
          type="submit"
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
        <Typography className="error-msg" color="error" variant="caption">
          {errorMessage}
        </Typography>
      </form>
      <GoogleButton
        className="google-btn"
        label="Sign up with Google"
        onClick={handleGoogleSignIn}
        type="light"
      ></GoogleButton>
      <Link
        onClick={() => {
          setRegister(false);
        }}
        className="create-account-button"
        component="button"
        variant="body2"
      >
        Log in
      </Link>
    </div>
  );
};
const LoggedMenu = (props: IAuthMenu) => {
  const { setAnchorEl } = props;
  const currentUser = useSelector((state: IProps) => state.currentUser);

  const handleLogout = () => {
    logOut();
    setAnchorEl(null);
  };

  return (
    <div className="logout-menu">
      <MenuItem>{currentUser.displayName || currentUser.email}</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </div>
  );
};
const AuthMenu = React.forwardRef((props: IAuthMenu, _ref: any) => {
  const { setAnchorEl } = props;
  const isLogged = useSelector((state: IProps) => state.isLogged);
  const [isRegister, setRegister] = useState(false);
  if (isLogged) {
    return <LoggedMenu setAnchorEl={setAnchorEl} />;
  } else {
    if (isRegister) {
      return (
        <RegisterMenu setAnchorEl={setAnchorEl} setRegister={setRegister} />
      );
    } else {
      return <LoginMenu setAnchorEl={setAnchorEl} setRegister={setRegister} />;
    }
  }
});
export default AuthMenu;
