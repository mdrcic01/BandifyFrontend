import {
  FormControl, Grid, Input, InputLabel, MenuItem, Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import { getUser } from "../../util/apiCalls";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import CancelIcon from "@mui/icons-material/Cancel";
import "./viewProfile.css";

export default function ViewProfile({ toggleModal }) {
  const [email, setEmail] = React.useState("");
  const [fname, setFName] = React.useState("");
  const [lname, setLName] = React.useState("");
  const [role, setRole] = React.useState("");

  React.useEffect(() => {
    getUser(localStorage.getItem("username"))
      .then((resp) => {
        resp.json().then((data) => {
          console.log(data);
          setEmail(data.email);
          setFName(data.firstName);
          setLName(data.lastName);
          setRole(data.role);
          console.log(data);
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }, []);

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
      <div>
        <DialogContent>
          <FormControl
            required={true}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
            style={{ textAlign: "center" }}
          >
            <InputLabel htmlFor="standard-adornment-fname">
              Your First Name
            </InputLabel>
            <Input
              id="standard-adornment-fname"
              type={"text"}
              value={fname}
              disabled={true}
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
              Your Last Name
            </InputLabel>
            <Input
              id="standard-adornment-fname"
              type={"text"}
              value={lname}
              disabled={true}
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
              disabled={true}
            />
          </FormControl>
          <br />
          <br />
        </DialogContent>
        <DialogActions align="center">
          <Grid container justify="center">
            <Button
              variant="contained"
              fullWidth
              className={"button"}
              onClick={toggleModal}
            >
              {" "}
              <CancelIcon />
              CLOSE
            </Button>
          </Grid>
        </DialogActions>
      </div>
    </React.Fragment>
  );
}
