import {
  Box,
  CardHeader,
  Chip,
  Collapse,
  Grid,
  Snackbar,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import IconButton from "@mui/material/IconButton";
import SpatialAudioOffIcon from "@mui/icons-material/SpatialAudioOff";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import add from "../../assets/add.png";
import deletes from "../../assets/delete.png";
import band from "../../assets/band.png";
import edit from "../../assets/edit.png";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import PersonRounded from "@mui/icons-material/PersonRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Image, Stack } from "react-bootstrap";
import Header from "../../common/header/Header";
import AddBand from "./addBand";
import {
  deleteBandById,
  getAllApplication,
  getMyBand,
  updateApplicationStatus,
} from "../../util/apiCalls";
import EditBand from "./editBand";
import "./bands.css"

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
export default function Band() {
  // const [searchBand, setSearchBand] = React.useState('');
  // const [searchLevel, setSearchLevel] = React.useState('ALL');
  // const [searchRating, setSearchRating] = React.useState('');
  // const [eStreet, seteStreet] = React.useState("");
  // const [eCity, seteCity] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  // const [eState, seteState] = React.useState("");
  const [isEditBandOpen, setIsEditBandOpen] = React.useState(false);
  const [isAddBandsOpen, setIsAddBandsOpen] = React.useState(false);
  // const [isViewLessonOpen, setIsViewLessonOpen] = React.useState(false);
  // const [isViewQuizOpen, setIsViewQuizOpen] = React.useState(false);
  const [value, setValue] = React.useState(1);
  const [bandData, setBandData] = React.useState("");
  const [applications, setApplications] = React.useState([]);
  // const [isOpen, setIsOpen] = React.useState(false);
  // const [logButtonName, setlogButtonName] = React.useState("LOGIN");
  // const [eselectValue, seteSelectValue] = React.useState([]);
  const [selectedBandId, setSelectedBandId] = React.useState("");
  const [expanded, setExpanded] = React.useState(-1);

  const loginHandler = (value) => {
    setIsLoggedIn(value);
  };
  React.useEffect(() => {
    getLoggedInStatus();
  }, [value]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  React.useEffect(() => {
    getMyBand()
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          console.log(data);
          setBandData(data);
          if (data.id !== undefined) {
            getAllApplication(data.id)
              .then((resp) => {
                console.log(resp);
                resp.json().then((data) => {
                  console.log(data);
                  setApplications(data);
                });
              })
              .catch((error) => {
                console.log("login user err " + error);
              });
          }
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }, [isLoggedIn]);

  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };

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

  const DialogAddSlot = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      padding: theme.spacing(2),
      minWidth: "1000px !important",
      height: "500px",
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  
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

  DialogTitleForModal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  function toggleAddBandModal() {
    setIsAddBandsOpen(!isAddBandsOpen);
    if (isAddBandsOpen === true) {
      getMyBand()
        .then((resp) => {
          console.log(resp);
          resp.json().then((data) => {
            console.log(data);
            setBandData(data);
          });
        })
        .catch((error) => {
          console.log("login user err " + error);
        });
    }
  }

  function toggleDeleteBandModal(bandId) {

    deleteBandById(bandId)
      .then((resp) => {
        getMyBand()
          .then((resp) => {
            console.log(resp);
            resp.json().then((data) => {
              console.log(data);
              setBandData(data);
            });
          })
          .catch((error) => {
            console.log("login user err " + error);
          });
      })
      .catch((error) => {
        console.log("deleteBandById user err ", error);
        setSnackMessage(error.response.data.message);
        setOpenSnack(true);
      });
  }

  const toggleEditBandModal = (bandId) => {
    setIsEditBandOpen(!isEditBandOpen);
    setSelectedBandId(bandId);
    if (isEditBandOpen === true) {
      getMyBand()
        .then((resp) => {
          console.log(resp);
          resp.json().then((data) => {
            console.log(data);
            setBandData(data);
          });
        })
        .catch((error) => {
          console.log("login user err " + error);
        });
    }
  };

  function toggleApplicationStatusBandModal(bandId, musicianId, status) {
    updateApplicationStatus(bandId, musicianId, status)
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          getMyBand()
            .then((resp) => {
              console.log(resp);
              resp.json().then((data) => {
                console.log(data);
                setBandData(data);
                if (data.id !== undefined) {
                  getAllApplication(data.id)
                    .then((resp) => {
                      console.log(resp);
                      resp.json().then((data) => {
                        console.log(data);
                        setApplications(data);
                      });
                    })
                    .catch((error) => {
                      console.log("login user err " + error);
                    });
                }
              });
            })
            .catch((error) => {
              console.log("login user err " + error);
            });
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }

  function isUserDefined() {
    return localStorage.getItem("username") !== undefined &&
        localStorage.getItem("username") !== null &&
        localStorage.getItem("username").trim() !== "";
  }

  return (
    <React.Fragment>
      <Header loginHandler={loginHandler} />
      <br />
      <br />
      <br />
      <br />
      <br />

      {isUserDefined() ? (
        <>
          {isUserDefined() &&
          localStorage.getItem("role").trim() === "musician" ? (
            <Image
              src={add}
              onClick={toggleAddBandModal}
              className={"add-button"}
            />
          ) : (
            ""
          )}
          <br />
          <br />
          <Grid
            container
            direction="row"
            rowSpacing={2}
            className={"band-container"}
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {bandData &&
            bandData !== "" &&
            bandData !== undefined &&
            bandData.bandName !== null ? (
              <Grid item>
                <Card className={"card"}>
                  <CardMedia
                    sx={{
                      padding: "1em 1em 0 1em",
                      objectFit: "contain",
                      minWidth: "15%",
                      maxWidth: "15%",
                    }}
                    component="img"
                    image={band}
                  />
                  <Box className={"box"}>
                    <CardActions>
                      <CardContent
                        style={{ fontFamily: "Roboto", width: "100%" }}
                      >
                        <div className={"band-metadata"}>
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
                              {bandData.bandName}
                            </Typography>
                          </Grid>
                          <Grid item md={2}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              className={"price-container"}
                            >
                              <Chip
                                className={"price"}
                                label={
                                  "Price : " +
                                  bandData.price +
                                  " " +
                                  bandData.currency.code
                                }
                                color="success"
                              />
                            </Typography>
                          </Grid>
                        </div>

                        <Typography variant="body2" color="text.secondary">
                          Genre : {bandData.genre.genre}
                        </Typography>
                        <br />
                        <div className={"band-metadata"}>
                          <PersonRounded />
                          {bandData.createdBy.firstName}{" "}
                          {bandData.createdBy.lastName} (
                          {bandData.createdBy.username})
                        </div>

                        <div className={"action-buttons"}>
                          <Button
                            variant="contained"
                            onClick={(e) => toggleEditBandModal(bandData.id)}
                          >
                            <Image
                              src={edit}
                              size="small"
                              className={"button-img"}
                            />
                            &nbsp;EDIT
                          </Button>
                          &nbsp;
                          <Button
                            variant="contained"
                            onClick={(e) => toggleDeleteBandModal(bandData.id)}
                          >
                            <Image src={deletes} className={"button-img"} />
                            &nbsp;DELETE
                          </Button>
                        </div>

                        <br />
                      </CardContent>
                      <ExpandMore
                        expand={expanded}
                        onClick={() => handleExpandClick()}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <IconButton style={{ backgroundColor: "#001f3d" }}>
                          <ExpandMoreIcon style={{ fill: "white" }} />
                        </IconButton>
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <Grid container direction={"row"}>
                        <Grid item md={5}>
                          <Card>
                            <CardHeader
                              avatar={<VolumeUpIcon className={"icon"} />}
                              title={"Instruments"}
                              titleTypographyProps={{ variant: "body1" }}
                              className={"table-header"}
                            />
                            <CardContent>
                              {bandData.instruments.length > 0 ? (
                                <Box>
                                  {bandData.instruments.map((ins, ind) => (
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
                                <SpatialAudioOffIcon className={"icon"} />
                              }
                              title={"Musicians"}
                              titleTypographyProps={{ variant: "body1" }}
                              className={"table-header"}
                            />
                            <CardContent>
                              {bandData.musicians.length > 0 ? (
                                <Box>
                                  {bandData.musicians.map((ins, ind) => (
                                    <>
                                      <div className={"applied-musicians"}>
                                        <PersonRounded />
                                        {ins.firstName} {ins.lastName}
                                      </div>
                                    </>
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
                      <Grid item md={11}>
                        <Card>
                          <CardHeader
                            avatar={<MenuIcon className={"icon"} />}
                            title={"APPLICATIONS"}
                            titleTypographyProps={{ variant: "body1" }}
                            className={"table-header"}
                          />
                          <CardContent>
                            {applications.length > 0 ? (
                              <Box>
                                {applications.map((ins, ind) => (
                                  <>
                                    <Card
                                      style={{
                                        padding: "10px",
                                        backgroundColor: "#b3f3f5",
                                      }}
                                    >
                                      <div className={"applicant"}>
                                        <PersonRounded />
                                        {ins.musician.firstName}{" "}
                                        {ins.musician.lastName}
                                        <br/>
                                        {ins.musician.city.name} {`(${ins.musician.city.state.country.name})`}
                                        <br/>
                                      </div>
                                      <br />
                                      <br />
                                      <br/>
                                      <Typography variant="p">
                                        INSTRUMENTS:
                                        <hr/>
                                      </Typography>
                                      {ins.musician.instruments.map(
                                        (eaIns, eaInd) => (
                                          <Typography variant="subtitle2">
                                            {eaIns.name}
                                          </Typography>
                                        )
                                      )}

                                      <div className={"applicant-buttons"}>
                                        <Button
                                          variant="contained"
                                          onClick={(e) =>
                                            toggleApplicationStatusBandModal(
                                              ins.band.id,
                                              ins.musician.id,
                                              "approved"
                                            )
                                          }
                                        >
                                          APPROVE
                                        </Button>{" "}
                                        &nbsp;&nbsp;
                                        <Button
                                          variant="contained"
                                          onClick={(e) =>
                                            toggleApplicationStatusBandModal(
                                              ins.band.id,
                                              ins.musician.id,
                                              "declined"
                                            )
                                          }
                                        >
                                          DECLINE
                                        </Button>
                                      </div>
                                    </Card>
                                    <br />
                                    <br />
                                  </>
                                ))}
                              </Box>
                            ) : (
                              <p className={"not-found-message"}>
                                Currently, there is no applicants!
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                      <br />
                      <br />
                    </Collapse>
                  </Box>
                </Card>
              </Grid>
            ) : (
              <p className={"not-found-message"}>You do not own a band</p>
            )}
          </Grid>
          <br />
          <br />
          <br />
        </>
      ) : (
        <></>
      )}

      <DialogAddSlot
        onClose={toggleAddBandModal}
        aria-labelledby="customized-dialog-title"
        open={isAddBandsOpen}
      >
        <DialogTitleForModal
          id="customized-dialog-title"
          className="toolHeader modal-title"
        >
          ADD NEW BAND
        </DialogTitleForModal>

        <AddBand addBandModal={toggleAddBandModal} />
      </DialogAddSlot>

      <DialogAddSlot
        onClose={toggleEditBandModal}
        aria-labelledby="customized-dialog-title"
        open={isEditBandOpen}
      >
        <DialogTitleForModal
          id="customized-dialog-title"
          className="toolHeader modal-title"
        >
          EDIT Band
        </DialogTitleForModal>

        <EditBand editBandModal={toggleEditBandModal} bandId={selectedBandId} />
      </DialogAddSlot>

      <Snackbar
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