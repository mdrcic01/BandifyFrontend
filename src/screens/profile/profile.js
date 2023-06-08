import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import * as React from "react";
import { editUsers, getUser } from "../../util/apiCalls";
import {
  FormControl,
  Grid,
  Input,
  InputLabel,
  Snackbar,
} from "@mui/material";
import "./profile.css";


export default function Profile({ toggleModal }) {
  const [role, setRole] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [mobileError, setMobileError] = React.useState("");
  const [cpasswordError, setcPasswordError] = React.useState("");
  const [snackMessage, setSnackMessage] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");
  const [fname, setFName] = React.useState("");
  const [lname, setLName] = React.useState("");

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const cpasswordChange = (event) => {
    setCPassword(event.target.value);
  };

  const emailChange = (event) => {
    setEmail(event.target.value);
    if (!ValidateEmail(event.target.value)) {
      setEmailError("Enter valid Email!");
    } else {
      setEmailError("");
    }
  };

  const roleChange = (event) => {
    setRole(event.target.value);
  };
  const fnameChange = (event) => {
    setFName(event.target.value);
  };

  const lnameChange = (event) => {
    setLName(event.target.value);
  };

  React.useEffect(() => {
    getUser(localStorage.getItem("username"))
      .then((resp) => {
        resp.json().then((data) => {
          console.log(data);
          setEmail(data.email);
          setFName(data.firstName);
          setLName(data.lastName);
          setRole(data.role);
          setPassword(data.password);
          setCPassword(data.password);
          console.log(data);
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }, []);

  function isAnyFieldEmpty() {
    return (
      email === "" ||
      email === undefined ||
      password === "" ||
      password === undefined ||
      fname === "" ||
      fname === undefined ||
      lname === "" ||
      lname === undefined ||
      role === "" ||
      role === undefined
    );
  }

  const editUser = () => {
    if (isAnyFieldEmpty()) {
      setSnackMessage("Please fill out this field");
      setOpenSnack(true);
    } else if (!ValidateEmail(email)) {
      return false;
    } else if (password != cpassword) {
      setcPasswordError("Password mismatched!");
      return false;
    } else {
      editUsers(fname, lname, email, password, role)
        .then((resp) => {
          console.log(resp);
          resp.json().then((data) => {
            console.log(data);
            setSnackMessage("User updated successfully");
            setOpenSnack(true);
            localStorage.setItem("firstname", data.firstName);
            localStorage.setItem("lastname", data.lastName);
            localStorage.setItem("username", data.username);
            localStorage.setItem("role", data.role);
            localStorage.setItem("userId", data.id);
            localStorage.setItem("token", data.token);
            toggleModal();
          });
        })
        .catch((error) => {
          console.log("User update failed" + error);
          setSnackMessage(error);
        });
    }
  };

  function ValidateEmail(mail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
  }

  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };

  return (
    <React.Fragment>
      <div className={"modal-wrapper"}>
        <DialogContent>
          <FormControl
            required={true}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
            className={"form-wrapper"}
          >
            <InputLabel htmlFor="standard-adornment-fname">
              First Name
            </InputLabel>
            <Input
              id="standard-adornment-fname"
              type={"text"}
              value={fname}
              defaultValue={fname}
              onChange={fnameChange}
            />
          </FormControl>
          <br />
          <br />
          <FormControl
            required={true}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
            className={"form-wrapper"}
          >
            <InputLabel htmlFor="standard-adornment-fname">
              Last Name
            </InputLabel>
            <Input
              id="standard-adornment-fname"
              type={"text"}
              value={lname}
              defaultValue={lname}
              onChange={lnameChange}
            />
          </FormControl>
          <br />
          <br />

          <FormControl
            required={true}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
            className={"form-wrapper"}
          >
            <InputLabel htmlFor="standard-adornment-email">
              Your Email
            </InputLabel>
            <Input
              id="standard-adornment-email"
              type={"text"}
              value={email}
              defaultValue={email}
              onChange={emailChange}
            />
          </FormControl>
          <br />
          <span className={"error-message"}>{emailError}</span>
          <br />
          <FormControl
            required={true}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
            className={"form-wrapper"}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Your Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={"password"}
              value={password}
              defaultValue={password}
              onChange={passwordChange}
            />
          </FormControl>
          <br />
          <br />
          <FormControl
            required={true}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
            className={"form-wrapper"}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Your Confirm Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={"password"}
              value={cpassword}
              defaultValue={cpassword}
              onChange={cpasswordChange}
            />
          </FormControl>
          <br />
          <span className={"error-message"}>{cpasswordError}</span>
          <br />
          <span className={"error-message"}>{mobileError}</span>
          <br />
        </DialogContent>
        <DialogActions align="center">
          <Grid container justify="center">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={editUser}
            >
              <ThumbUpAlt />
              &nbsp;SAVE
            </Button>
          </Grid>
        </DialogActions>

        <Snackbar
          className={"snackbar"}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          open={openSnack}
          onClose={handleSnackClose}
          message={snackMessage}
        />
      </div>
    </React.Fragment>
  );
}