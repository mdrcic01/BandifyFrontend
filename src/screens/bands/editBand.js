import { FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Snackbar, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import addBandImg from "../../assets/editBand.png";
import { Image } from "react-bootstrap";
import {
  editBand,
  getAllCurrency,
  getAllGenre,
  getAllInstruments,
  getBandById,
} from "../../util/apiCalls";
import "./editBand.css"

export default function EditBand({ editBandModal, bandId }) {
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

    getBandById(bandId)
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          console.log(data);
          setBandName(data.bandName);
          setPrice(data.price);
          setSelectGenre(data.genre.genre);
          setSelectValue(data.currency.code);
          let arr = [];
          data.instruments.map((e) => {
            arr.push(e.name);
          });
          setSelectInstrumentValue(arr);
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
    console.log(value);
  };

  const handleGenreChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectGenre(value);
    console.log(value);
  };

  const handleInstrumentChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectInstrumentValue(
      typeof value === "string" ? value.split(",") : value
    );
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

  function isAnyRequiredFieldBlank() {
    return bandName === "" ||
        bandName === undefined ||
        price === "" ||
        price === undefined ||
        selectValue === "" ||
        selectValue === undefined ||
        selectGenre === "" ||
        selectGenre === undefined ||
        selectInstrumentValue === "" ||
        selectInstrumentValue === undefined;
  }

  function updateBand() {
    if (isAnyRequiredFieldBlank()) {
      setSnackMessage("Fields cannot be blank");
      setOpenSnack(true);
    } else {
      editBand(
        bandName,
        price,
        selectValue,
        selectGenre,
        selectInstrumentValue,
        bandId
      )
        .then((resp) => {
          console.log(resp);
          if (resp.ok) {
            setSnackMessage("Band updated successfully");
            setOpenSnack(true);
            editBandModal();
          } else {
            setSnackMessage(resp);
            setOpenSnack(true);
          }
        })
        .catch(function (error) {
          alert(error);
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
            <Image src={addBandImg} className={"band-img"} />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={6}>
            <br />
            <FormControl
              required={true}
              fullWidth
              variant="standard"
              className={"form-wrapper"}
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
              className={"form-wrapper"}
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
        <Button variant="contained" onClick={updateBand} className={"button"}>
          &nbsp;UPDATE BAND
        </Button>
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
    </React.Fragment>
  );
}