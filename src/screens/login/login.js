import {
  FormControl,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";
import { loginUser } from "../../util/apiCalls";
import Register from "../register/register";
import "./login.css"

export default function Login({ toggleModal, loginButton }) {
  const [openSnack, setOpenSnack] = React.useState(false);
  const [lusername, setLUsername] = React.useState("");
  const [lpassword, setLPassword] = React.useState("");
  const [invalidError, setInvalidError] = React.useState("");
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const passwordChange = (event) => {
    setLPassword(event.target.value);
  };

  const usernameChange = (event) => {
    setLUsername(event.target.value);
  };

  const clickSignUp = () => {
    toggleSignUpModal();
  };

  function isAnyFieldEmpty() {
    return (
      lusername === "" ||
      lusername === undefined ||
      lpassword === "" ||
      lpassword === undefined
    );
  }

  function areDataFieldsEmpty(data) {
    return (
      data !== null &&
      data.username !== undefined &&
      data.username !== "" &&
      data.username !== "undefined" &&
      data.username !== null
    );
  }

  const clickLogin = () => {
    if (isAnyFieldEmpty()) {
      setOpenSnack(true);
    } else {
      loginUser(lusername, lpassword)
        .then((resp) => {
          resp.json().then((data) => {
            if (areDataFieldsEmpty(data)) {
              localStorage.setItem("firstname", data.firstName);
              localStorage.setItem("lastname", data.lastName);
              localStorage.setItem("username", data.username);
              localStorage.setItem("userId", data.userId);
              localStorage.setItem("token", data.token);
              localStorage.setItem("role", data.role);
              loginButton("LOGOUT");
              toggleModal();
            } else {
              setInvalidError("Invalid credentials!");
            }
          });
        })
        .catch((error) => {
          console.log("login user err " + error);
        });
    }
  };

  const toggleSignUpModal = () => {
    setIsSignUpOpen(!isSignUpOpen);
  };
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      padding: theme.spacing(2),
      minWidth: "900px !important",
      height: "800px",
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          />
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <DialogContent>
            <FormControl
              required={true}
              fullWidth
              sx={{ m: 1 }}
              className="inputRounded form-wrapper"
              variant="outlined"
            >
              <TextField
                size="small"
                label="Username"
                id="standard-adornment-lusername"
                className="inputRounded"
                type={"text"}
                defaultValue={lusername}
                onBlur={usernameChange}
              />
            </FormControl>
            <br />
            <br />
            <FormControl
              required={true}
              fullWidth
              sx={{ m: 1 }}
              variant="outlined"
              className={"form-wrapper"}
            >
              <TextField
                size="small"
                label="Password"
                className="inputRounded"
                id="standard-adornment-lpassword"
                type={"password"}
                defaultValue={lpassword}
                onBlur={passwordChange}
              />
            </FormControl>
            <br />
            <span
              className={"error-message"}
            >
              {invalidError}
            </span>
          </DialogContent>
          <DialogActions align="center">
            <Button
              variant="contained"
              style={{ backgroundColor: "#262673"}}
              onClick={clickLogin}
            >
              &nbsp;SIGNIN
            </Button>

            <Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dont have an account?{" "}
              <Button color="primary" onClick={clickSignUp}>
                Sign up
              </Button>
            </Typography>
          </DialogActions>

          <Snackbar
            className={"snackbar"}
            autoHideDuration={1300}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            open={openSnack}
            onClose={handleSnackClose}
            message="Please fill out this field"
          />
          <BootstrapDialog
            onClose={toggleSignUpModal}
            aria-labelledby="customized-dialog-title"
            open={isSignUpOpen}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={toggleSignUpModal}
              className="toolHeader register-title"
            >
              REGISTER
            </BootstrapDialogTitle>

            <Register toggleModal={toggleSignUpModal} />
          </BootstrapDialog>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}