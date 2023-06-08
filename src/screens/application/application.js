import { Grid, TableCell, TableHead, TableRow, Table, TableContainer, TableBody, Paper, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import * as React from "react";
import band from "../../assets/band.png";
import DialogTitle from "@mui/material/DialogTitle";
import Header from "../../common/header/Header";
import { getAllApplicationStatus } from "../../util/apiCalls";
import "./application.css";

export default function Application() {
  const [application, setApplication] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const [value, setValue] = React.useState(1);

  const loginHandler = (value) => {
    setIsLoggedIn(value);
  };
  React.useEffect(() => {
    getLoggedInStatus();
  }, [value]);

  React.useEffect(() => {
    getAllApplicationStatus()
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          let arr = [];

          data.map((e) => {
            arr.push(e.band.id);
          });
          setApplication(data);
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }, [isLoggedIn]);

  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };

  const columns = [
    { id: "band", label: "BAND NAME", minWidth: 100 },
    { id: "status", label: "STATUS", minWidth: 100 },
    { id: "appliedOn", label: "APPLIED ON", minWidth: 100 },
  ];

  function getLoggedInStatus() {
    if (
      localStorage.getItem("username") !== "" &&
      localStorage.getItem("username") !== undefined &&
      localStorage.getItem("username") !== null
    ) {
      console.log("Logged in already");
      setIsLoggedIn(true);
    } else {
      console.log("Not logged in");
      setIsLoggedIn(false);
      window.location.replace("/");
    }
  }

  const DialogTitleForModal = (props) => {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          />
        ) : null}
      </DialogTitle>
    );
  };

  DialogTitleForModal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <React.Fragment>
      <Header loginHandler={loginHandler} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Grid container>
        <Grid item md={1} />
        <Grid item md={10}>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="customized table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "700",
                        backgroundColor: "rgb(38, 38, 115)",
                        color: "white",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {application.length > 0 ? (
                  application.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "band" ? (
                                <>{value.bandName}</>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  <p style={{ color: "red", padding: "10px" }}>
                    No records found!
                  </p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid item md={1} />
        </Grid>
      </Grid>

      <Snackbar
        className={"snackbar"}
        autoHideDuration={4000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        open={openSnack}
        onClose={handleSnackClose}
        message={snackMessage}
      />
    </React.Fragment>
  );
}