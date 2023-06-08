import "./homepage.css"
import { Grid, Snackbar, Box, Collapse, Chip, CardHeader, Alert } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "../../common/header/Header";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import band from "../../assets/band.png";
import PersonRounded from "@mui/icons-material/PersonRounded";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import IconButton from "@mui/material/IconButton";
import SpatialAudioOffIcon from "@mui/icons-material/SpatialAudioOff";
import {
  getAllApplicationStatus,
  getAllBands,
  getMyBand,
  saveApplication, updateApplicationStatus,
} from "../../util/apiCalls";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(180deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const [bands, setBands] = React.useState([]);
  const [bandOwner, setBandOwner] = React.useState(false);
  const [application, setApplication] = React.useState([]);
  const [appliedBandIds, setAppliedBandIds] = React.useState([]);
  const [severity, setSeverity] = React.useState("success");
  const [expanded, setExpanded] = React.useState(-1);
  const loginHandler = (value) => {
    setIsLoggedIn(value);
  };
  React.useEffect(() => {
    getLoggedInStatus();

    getAllBand();
    getAllApplicationStatusByMusician();
  }, [isLoggedIn]);

  React.useEffect(() => {
    getMyBand().then((resp) => {
      console.log(resp);
      resp.json().then((data) => {
        if (data.bandName !== null) {
          setBandOwner(true);
        }
      });
    });
  }, []);

  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };

  const handleExpandClick = (i, courseId) => {
    setExpanded(expanded === i ? -1 : i);
  };

  function getAllBand() {
    getAllBands()
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          setBands(data);
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }

  function getAllApplicationStatusByMusician() {
    getAllApplicationStatus()
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          let arr = [];
          if (
            localStorage.getItem("username") !== undefined &&
            localStorage.getItem("username") !== null &&
            localStorage.getItem("username").trim() !== "" &&
            localStorage.getItem("role") === "musician"
          ) {
            data.map((e) => {
              arr.push(e.band.id);
            });
            setAppliedBandIds(arr);
          }

          setApplication(data);
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }

  function openBandsPage() {
    if (isLoggedIn) {
      window.location.replace("/");
    } else {
      setSeverity("error");
      setSnackMessage("Please login to proceed");
      setOpenSnack(true);
    }
  }

  const toggleApplyBandModal = (bandId) => {
    saveApplication(bandId)
      .then((resp) => {
        console.log(resp);
        getAllApplicationStatus()
          .then((resp) => {
            console.log(resp);
            resp.json().then((data) => {
              let arr = [];

              data.map((e) => {
                arr.push(e.band.id);
              });
              setAppliedBandIds(arr);
              setApplication(data);
            });
          })
          .catch((error) => {
            console.log("login user err " + error);
          });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  };

  function getLoggedInStatus() {
    if (
      localStorage.getItem("username") !== "" &&
      localStorage.getItem("username") !== undefined &&
      localStorage.getItem("username") !== null
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  function checkIfUserLoggedIn() {
    return localStorage.getItem("username") !== undefined &&
        localStorage.getItem("username") !== null &&
        localStorage.getItem("username").trim() !== "" &&
        localStorage.getItem("role") === "musician"
  }

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
      <Header loginHandler={loginHandler} />

      {localStorage.getItem("username") !== undefined &&
      localStorage.getItem("username") !== null &&
      localStorage.getItem("username").trim() !== "" ? (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Grid
            container
            direction="row"
            className={"grid"}
            rowSpacing={2}
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {bands.length > 0 ? (
              bands.map((singleBand, i) => (
                <Grid item>
                  <Card className={"card"} >
                    <CardMedia
                      className={"card-content"}
                      component="img"
                      image={band}
                    />
                    <Box className={"box"}>
                      <CardActions>
                        <CardContent className={"card-content-price"}>
                          <div className={"band-details-grid"}>
                            <Grid item md={10}>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                                style={{
                                  fontSize: 17,
                                  fontWeight: "700",
                                  float: "left",
                                  fontFamily: "fantasy",
                                }}
                              >
                                {singleBand.bandName}
                              </Typography>
                            </Grid>
                            <Grid item md={2}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                style={{
                                  display: "inline-flex",
                                  float: "right",
                                }}
                              >
                                <Chip
                                  className={"price-tag"}
                                  label={
                                    "Price : " +
                                    singleBand.price +
                                    " " +
                                    singleBand.currency.code
                                  }
                                  color="success"
                                />
                              </Typography>
                            </Grid>
                          </div>
                          <Typography variant="body2" color="text.secondary">
                            Genre : {singleBand.genre.genre}
                          </Typography>
                          <br/>
                          <div className={"owner-tag"}>
                            <PersonRounded />
                            {singleBand.createdBy.firstName} {singleBand.createdBy.lastName}{" "}
                            ({singleBand.createdBy.username})
                          </div>
                          {checkIfUserLoggedIn() && !bandOwner ? (
                            appliedBandIds.includes(singleBand.id) ? (
                              <div
                                  className={"already-applied-btn"}
                              >
                                <Button variant="contained" color="warning">
                                  {" "}
                                  <BookmarksIcon /> APPLIED ALREADY
                                </Button>
                              </div>
                            ) : (
                              <div className={"apply-btn"}>
                                <Button
                                  variant="contained"
                                  onClick={(e) => toggleApplyBandModal(singleBand.id)}
                                >
                                  {" "}
                                  <BookmarksIcon /> APPLY
                                </Button>
                              </div>
                            )
                          ) : (
                            ""
                          )}
                          <br/>
                        </CardContent>
                        <ExpandMore
                          expand={expanded}
                          onClick={() => handleExpandClick(i, singleBand.id)}
                          aria-expanded={expanded === i}
                          aria-label="show more"
                        >
                          <IconButton style={{ backgroundColor: "#001f3d" }}>
                            <ExpandMoreIcon style={{ fill: "white" }} />
                          </IconButton>
                        </ExpandMore>
                      </CardActions>
                      <Collapse
                        in={expanded === i}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Grid container direction={"row"} className={"tables-row"}>
                          <Grid item md={5}>
                            <Card>
                              <CardHeader
                                avatar={
                                  <VolumeUpIcon style={{ fill: "white" }} />
                                }
                                title={"Instruments"}
                                titleTypographyProps={{ variant: "body1" }}
                                className={"table-header"}
                              />
                              <CardContent>
                                {singleBand.instruments.length > 0 ? (
                                  <Box>
                                    {singleBand.instruments.map((ins, ind) => (
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        {ins.name}
                                      </Typography>
                                    ))}
                                  </Box>
                                ) : (
                                  ""
                                )}
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item md={1} />
                          <Grid item md={5}>
                            <Card>
                              <CardHeader
                                avatar={
                                  <SpatialAudioOffIcon
                                    style={{ fill: "white" }}
                                  />
                                }
                                title={"Musicians"}
                                titleTypographyProps={{ variant: "body1" }}
                                className={"table-header"}
                              />
                              <CardContent>
                                {singleBand.musicians.length > 0 ? (
                                  <Box>
                                    {singleBand.musicians.map((ins, ind) => (
                                      <div className={"musician-list"}>
                                        <PersonRounded />
                                        {ins.firstName} {ins.lastName}
                                      </div>
                                    ))}
                                  </Box>
                                ) : (
                                  ""
                                )}
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                        <br />
                        <br />
                      </Collapse>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <p className={"no-bands-message"}>No bands available for preview</p>
            )}
          </Grid>
        </>
      ) : (
        <div
          style={{
            minHeight: "800px",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            background:
              "url(" +
              "https://s3.amazonaws.com/busites_www/bradpaisley/1-default/2-brad-paisley/hkjv3r_1537466314.jpg" +
              ") no-repeat center center fixed",
            width: "100%",
            height: "100%",
          }}
        >
          <br />
          <br />
          <br />
          <br />
          <Box className={"welcome-box"}>
            <h1 className={"title"}>BANDIFY</h1>
            <br />
            <p className={"message"}>Find your dream gig!</p>
            <Button variant="outlined" onClick={() => openBandsPage()}>
              VIEW BANDS
            </Button>
          </Box>
          <br />
        </div>
      )}

      <Snackbar
        className={"snackbar"}
        autoHideDuration={4000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        open={openSnack}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}