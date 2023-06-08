import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import PropTypes from "prop-types";
import * as React from "react";
import { NavLink } from "react-router-dom";
import image from "../../assets/logo1.png";
import Login from "../../screens/login/login";
import "./Header.css";
import { IconButton, Tab, Tabs } from "@mui/material";
import EditProfile from "../../screens/register/editProfile";

export default function Header({ loginHandler }) {

  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [logButtonName, setlogButtonName] = React.useState(
    isUserSessionAlreadyActive()
  );

  function isUserSessionAlreadyActive() {
    if (
      localStorage.getItem("username") !== "" &&
      localStorage.getItem("username") !== undefined &&
      localStorage.getItem("username") !== null
    ) {
      loginHandler(true);
      return "LOGOUT";
    } else {
      loginHandler(false);
      return "LOGIN";
    }
  }

  function toggleModal() {
    if (logButtonName === "LOGOUT") {
      localStorage.removeItem("firstname");
      localStorage.removeItem("lastname");
      localStorage.removeItem("username");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setlogButtonName("LOGIN");
      window.location.replace("/");
    } else {
      setIsOpen(!isOpen);
    }
  }

  function toggleProfileModal() {
    setIsProfileOpen(!isProfileOpen);
  }

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
      overflowY: "unset",
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const BootstrapProfileDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      padding: theme.spacing(2),
      minWidth: "900px !important",
      height: "600px",
    },
    "& .MuiDialogActions-root": {
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
    <Box className={"toolbar-wrapper"}>
      <AppBar position="fixed">
        <Toolbar
          className="toolbar"
          position="fixed"
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <img src={image} className="img" alt={"NOT FOUND"}/>
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            className={"page-title"}
          >
            BANDIFY
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;
          <NavLink
            className="navbar-item"
            to="/"
          >
            <IconButton>
              <div className={"nav-btn"}>
                <HomeWorkIcon />
                &nbsp;<span>HOME</span>
              </div>
            </IconButton>
          </NavLink>
          {localStorage.getItem("username") !== undefined &&
          localStorage.getItem("username") !== null &&
          localStorage.getItem("username").trim() !== "" &&
          localStorage.getItem("role").trim() === "musician" ? (
            <>
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <NavLink
                className="navbar-item"
                to="/bands"
              >
                <IconButton>
                  &nbsp;&nbsp;
                  <div className={"nav-btn"}>
                    <LibraryBooksIcon />
                    &nbsp;<span>MY BAND</span>
                  </div>
                </IconButton>
              </NavLink>
            </>
          ) : (
            ""
          )}
          {localStorage.getItem("username") !== undefined &&
          localStorage.getItem("username") !== null &&
          localStorage.getItem("username").trim() !== "" &&
          localStorage.getItem("role").trim() === "musician" ? (
            <>
              {" "}
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <NavLink
                className="navbar-item"
                to="/applications"
              >
                <IconButton>
                  &nbsp;&nbsp;
                  <div className={"nav-btn"}>
                    <LocalPharmacyIcon />
                    &nbsp;<span>MY APPLICATION</span>
                  </div>
                </IconButton>
              </NavLink>
            </>
          ) : (
            ""
          )}
          <div style={{ flex: "1" }} />
          &nbsp;&nbsp;&nbsp;
          {localStorage.getItem("username") !== undefined &&
          localStorage.getItem("username") !== null &&
          localStorage.getItem("username").trim() !== "" ? (
            <div
              onClick={toggleProfileModal}
              className={"welcome-banner"}
            >
              <span>
                {" "}
                Welcome {localStorage.getItem("firstname")}&nbsp;
              </span>
              &nbsp;&nbsp;
            </div>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            className={"login-button"}
            onClick={toggleModal}
          >
            {logButtonName}
          </Button>
          <BootstrapDialog
            onClose={toggleModal}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={toggleModal}
              className="toolHeader"
            >
              LOGIN
            </BootstrapDialogTitle>

            <Login toggleModal={toggleModal} loginButton={setlogButtonName} />
          </BootstrapDialog>
          <BootstrapProfileDialog
            onClose={toggleProfileModal}
            aria-labelledby="customized-dialog-title"
            open={isProfileOpen}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={toggleProfileModal}
              className="toolHeader"
            >
              PROFILE
            </BootstrapDialogTitle>

            <EditProfile toggleModal={toggleProfileModal} />
          </BootstrapProfileDialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
}