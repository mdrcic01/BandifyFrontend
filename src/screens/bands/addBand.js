import { FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Snackbar, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import { Image } from "react-bootstrap";
import addBandImg from "../../assets/addBand.png";
import {
  addBand,
  getAllCurrency,
  getAllGenre,
  getAllInstruments,
} from "../../util/apiCalls";
import "./addBand.css"

export default function AddBand({ addBandModal }) {
  const [bandName, setBandName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [selectValue, setSelectValue] = React.useState("");
  const [selectGenre, setSelectGenre] = React.useState("");
  const [selectInstrumentValue, setSelectInstrumentValue] = React.useState([]);
  const [instruments, setInstruments] = React.useState([]);
  const [currency, setCurrency] = React.useState([]);
  const [genre, setGenre] = React.useState([]);
  const [snackMessage, setSnackMessage] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };
  const handleBandNameChange = (e) => {
    setBandName(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  React.useEffect(() => {
    getAllInstrument();
    getAllCurrency()
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          console.log(data);
          setCurrency(data);
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });

    getAllGenre()
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          console.log(data);
          setGenre(data);
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }, []);

  function getAllInstrument() {
    getAllInstruments()
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          console.log(data);
          setInstruments(data);
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectValue(value);
    // console.log(value);
  };

  const handleGenreChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectGenre(value);
    // console.log(value);
  };

  const handleInstrumentChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectInstrumentValue(
      typeof value === "string" ? value.split(",") : value
    );
  };


  function isAnyRequiredFieldUnset() {
    return (
      bandName === "" ||
      bandName === undefined ||
      price === "" ||
      price === undefined ||
      selectValue === "" ||
      selectValue === undefined ||
      selectGenre === "" ||
      selectGenre === undefined ||
      selectInstrumentValue === "" ||
      selectInstrumentValue === undefined
    );
  }

  function addNewBand() {
    if (isAnyRequiredFieldUnset()) {
      setSnackMessage("Fields cannot be blank");
      setOpenSnack(true);
    } else {
      addBand(bandName, price, selectValue, selectGenre, selectInstrumentValue)
        .then((resp) => {
          console.log(resp);
          if (resp.status === 201) {
            console.log(resp);
            setSnackMessage("Band added successfully");
            setOpenSnack(true);
            addBandModal();
          } else if (resp.status === 500) {
            resp.json().then((data) => {
              alert(data.message);
              setSnackMessage(data.message);
              setOpenSnack(true);
            });
          }
        })
        .catch(function (error) {
          setSnackMessage(error);
          setOpenSnack(true);
        });
    }
  }
  return (
    <React.Fragment>
      <DialogContent>
        <Grid container>
          <Grid item xs={5}>
            <Image
              src={addBandImg}
              className={"band-img"}
            />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={6}>
            <br />
            <FormControl
              required={true}
              fullWidth
              variant="standard"
              className={"form"}
            >
              <TextField
                id="standard-adornment-fname"
                label="Enter Band Name"
                size="small"
                required={true}
                type={"text"}
                value={bandName}
                onChange={handleBandNameChange}
              />
            </FormControl>
            <br />
            <br />
            <FormControl
              required={true}
              fullWidth
              variant="standard"
              className={"form"}
            >
              <TextField
                id="standard-adornment-fname"
                label="Price"
                size="small"
                required={true}
                type={"text"}
                value={price}
                onChange={handlePriceChange}
              />
            </FormControl>

            <br />
            <br />

            <FormControl fullWidth>
              <InputLabel id="demo-multiple-checkbox-label" size="small">
                Select Instruments
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                size="small"
                value={selectInstrumentValue}
                onChange={handleInstrumentChange}
                input={<OutlinedInput label="Select Instruments" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {instruments.map((eachItem) => (
                  <MenuItem
                    key={eachItem.instrumentName}
                    value={eachItem.instrumentName}
                  >
                    <Checkbox
                      checked={
                        selectInstrumentValue.indexOf(eachItem.instrumentName) >
                        -1
                      }
                    />
                    <ListItemText primary={eachItem.instrumentName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <br />

            <FormControl fullWidth variant="outlined" required={true}>
              <InputLabel id="demo-multiple-checkbox-label" size="small">
                Select Currency
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                label="Select category"
                size="small"
                value={selectValue}
                onChange={handleChange}
                renderValue={(selected) => selected}
              >
                {currency.map((eachItem) => (
                  <MenuItem key={eachItem.code} value={eachItem.code}>
                    <ListItemText primary={eachItem.code} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <br />
            <br />

            <FormControl fullWidth variant="outlined" required={true}>
              <InputLabel id="demo-multiple-checkbox-label" size="small">
                Select Genre
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                label="Select Genre"
                size="small"
                value={selectGenre}
                onChange={handleGenreChange}
                renderValue={(selected) => selected}
              >
                {genre.map((eachItem) => (
                  <MenuItem key={eachItem.genre} value={eachItem.genre}>
                    <ListItemText primary={eachItem.genre} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions align="center">
        <Button
          variant="contained"
          className={"button"}
          onClick={addNewBand}
        >
          &nbsp;ADD BAND
        </Button>
      </DialogActions>
      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        className={"snackbar"}
        open={openSnack}
        onClose={handleSnackClose}
        message={snackMessage}
      />
    </React.Fragment>
  );
}