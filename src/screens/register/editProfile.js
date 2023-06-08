import {
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  OutlinedInput,
  Snackbar,
  TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Checkbox from "@mui/material/Checkbox";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";
import {
  getAllAuthorities,
  getAllCities,
  getAllCountries,
  getAllInstruments,
  getAllStates,
  getUserDetailsById,
  updateUser,
} from "../../util/apiCalls";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "./editProfile.css"

export default function EditProfile({ toggleModal }) {
  const [openSnack, setOpenSnack] = React.useState(false);
  const [cpasswordError, setcPasswordError] = React.useState("");
  const [countries, setCountries] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [selectedCountryName, setSelectedCountryName] = React.useState("");
  const [selectedState, setSelectedState] = React.useState("");
  const [selectedStateName, setSelectedStateName] = React.useState("");
  const [selectedCityName, setSelectedCityName] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState("");
  const [stateDisable, setStateDisable] = React.useState(true);
  const [cityDisable, setCityDisable] = React.useState(true);
  const [date, setDate] = React.useState("");
  const [state, setState] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [instruments, setInstruments] = React.useState([]);
  const [authorities, setAuthorities] = React.useState([]);
  const [selectValue, setSelectValue] = React.useState([]);
  const [selectAuthorityValue, setSelectAuthorityValue] = React.useState([]);
  const [invalidError, setInvalidError] = React.useState("");
  const [snackMessage, setSnackMessage] = React.useState("");
  const [showMusicianDetails, setShowMusicianDetails] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setCPassword] = React.useState("");
  const [fname, setFName] = React.useState("");
  const [lname, setLName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [qualification, setQualification] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [showNonMusicianDetails, setNonShowMusicianDetails] = React.useState(false);

  const handleSnackClose = () => {
    setOpenSnack(!openSnack);
  };

  React.useEffect(() => {
    getAllCountry();
    getAllInstrument();
    getAllAuthority();
    getUserDetails();
  }, []);

  function getUserDetails() {
    getUserDetailsById()
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          console.log(data);
          setCityDisable(false);
          setStateDisable(false);
          setFName(data.firstName);
          setLName(data.lastName);
          setUsername(data.username);
          setDate(data.dateOfBirth);
          setRole(data.userType);
          let arrAuth = [];
          data.authorities.map((e) => {
            arrAuth.push(e.name);
          });

          setSelectAuthorityValue(arrAuth);
          setSelectedCity(data.city.postalCode);
          setSelectedCityName(data.city.name);
          setSelectedState(data.city.state.id);
          setSelectedStateName(data.city.state.name);
          setSelectedCountry(data.city.state.country.id);
          setSelectedCountryName(data.city.state.country.name);
          getAllState(data.city.state.country.id);
          getAllCity(data.city.state.id);
          if (data.userType === "musician") {
            setShowMusicianDetails(true);
            let arr = [];
            data.instruments.map((e) => {
              arr.push(e.name);
            });
            setSelectValue(arr);
          } else {
            setQualification(data.bio);
            setNonShowMusicianDetails(true);
          }
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }

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

  function getAllAuthority() {
    getAllAuthorities()
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          console.log(data);
          setAuthorities(data);
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }
  function getAllCountry() {
    getAllCountries()
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          console.log(data);
          setCountries(data);
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }

  function getAllState(countryId) {
    getAllStates(countryId)
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          console.log(data);
          setState(data);
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }

  function getAllCity(stateId) {
    getAllCities(stateId)
      .then((resp) => {
        console.log(resp);
        resp.json().then((data) => {
          console.log(data);
          setCities(data);
        });
      })
      .catch((error) => {
        console.log("login user err " + error);
      });
  }

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const cpasswordChange = (event) => {
    setCPassword(event.target.value);
  };

  const handleDateChange = (val) => {
    setDate(val);
  };

  const usernameChange = (event) => {
    setUsername(event.target.value);
  };

  const nameFChange = (event) => {
    setFName(event.target.value);
  };

  const nameLChange = (event) => {
    setLName(event.target.value);
  };

  const handleCountryChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event);
    setStateDisable(false);
    setCityDisable(true);
    setSelectedCountry(value.id);
    setSelectedCountryName(value.name);
    setSelectedState("");
    setSelectedStateName("");
    setSelectedCity("");
    setSelectedCityName("");
    getAllState(value.id);
  };

  const handleStateChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event);
    setCityDisable(false);
    setSelectedState(value.id);
    setSelectedStateName(value.name);
    setSelectedCity("");
    setSelectedCityName("");
    getAllCity(value.id);
  };

  const handleCityChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event);
    setSelectedCity(value.postalCode);
    setSelectedCityName(value.name);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectValue(typeof value === "string" ? value.split(",") : value);
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

  const qualificationChange = (event) => {
    setQualification(event.target.value);
  };

  function isAnyRequiredFieldEmpty() {
    return username === "" ||
        username === undefined ||
        fname === "" ||
        fname === undefined ||
        lname === "" ||
        lname === undefined ||
        selectedCountry === "" ||
        selectedCountry === undefined ||
        date === "" ||
        date === undefined ||
        selectedState === "" ||
        selectedState === undefined ||
        selectedCity === "" ||
        selectedCity === undefined;
  }

  const clickRegister = () => {
    console.log(
      fname,
      lname,
      username,
      password,
      role,
      selectedCountry,
      selectedState,
      selectedCity,
      selectValue,
      selectAuthorityValue,
      qualification
    );
    if (isAnyRequiredFieldEmpty()) {
      setSnackMessage("Please fill out this field");
      setOpenSnack(true);
    } else if (password != cpassword) {
      setcPasswordError("Password mismatched!");
      setSnackMessage("Password mismatched!");
      setOpenSnack(true);
      return false;
    } else if (role === "musician" && selectValue.length === 0) {
      setSnackMessage("Please fill out this field");
      setOpenSnack(true);
    } else if (
      (role === "non-musician" && qualification === "") ||
      qualification === undefined
    ) {
      setSnackMessage("Please fill out this field");
      setOpenSnack(true);
    } else {
      updateUser(
        fname,
        lname,
        username,
        password,
        role,
        date,
        selectedCountry,
        selectedState,
        selectedCity,
        selectValue,
        selectAuthorityValue,
        qualification
      )
        .then((res) => {
          console.log(res);
          if (res.ok) {
            res.json().then((data) => {
              localStorage.setItem("firstname", data.firstName);
              localStorage.setItem("lastname", data.lastName);
              localStorage.setItem("username", data.username);
            });

            setFName("");
            setLName("");
            setUsername("");
            setPassword("");
            setBio("");
            setRole("");
            setQualification("");
            setSelectValue([]);
            setSelectAuthorityValue([]);
            setCPassword("");
            setcPasswordError("");
            setSnackMessage("Details updated successfully!");
            setOpenSnack(true);
            toggleModal();
          } else {
            res.text().then((text) => {
              let err = JSON.parse(text);
              console.log(err);
              setSnackMessage(err.detail);
              setOpenSnack(true);
            });
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("Regiter failed" + error);
          setInvalidError("Registration Failed!");
        });
    }
  };

  return (
    <React.Fragment>
      <div>
        <DialogContent>
          <Grid container>
            <Grid item md={5}>
              <FormControl
                required={true}
                fullWidth
                variant="outlined"
                className={"form-wrapper"}
              >
                <TextField
                  label="First Name"
                  size="small"
                  className="inputRounded"
                  id="standard-adornment-fname"
                  type={"text"}
                  value={fname}
                  onChange={nameFChange}
                />
              </FormControl>
              <br/>
              <br/>

              <FormControl
                required={true}
                fullWidth
                variant="outlined"
                className={"form-wrapper"}
              >
                <TextField
                  label="Last Name"
                  size="small"
                  className="inputRounded"
                  id="standard-adornment-fname"
                  type={"text"}
                  value={lname}
                  onChange={nameLChange}
                />
              </FormControl>
              <br/>
              <br/>

              <FormControl
                required={true}
                fullWidth
                variant="outlined"
                className={"form-wrapper"}
              >
                <TextField
                  label="Username"
                  size="small"
                  className="inputRounded"
                  type={"text"}
                  value={username}
                  onChange={usernameChange}
                />
              </FormControl>
              <br/>
              <br/>

              <FormControl
                required={true}
                fullWidth
                variant="outlined"
                className={"form-wrapper"}
              >
                <TextField
                  label="Password"
                  size="small"
                  className="inputRounded"
                  id="standard-adornment-password"
                  type={"password"}
                  value={password}
                  onChange={passwordChange}
                />
              </FormControl>
              <br/>
              <br/>
              <FormControl
                required={true}
                fullWidth
                variant="outlined"
                className={"form-wrapper"}
              >
                <TextField
                  label="Confirm Password"
                  size="small"
                  className="inputRounded"
                  id="standard-adornment-password"
                  type={"password"}
                  value={cpassword}
                  onChange={cpasswordChange}
                />
              </FormControl>
              <br/>
              <br/>

              <LocalizationProvider
                dateAdapter={AdapterDateFns}
              >
                <DesktopDatePicker
                  label="Select date of birth"
                  value={date}
                  disableFuture="true"
                  onChange={(val) => handleDateChange(val)}
                  renderInput={(params) => (
                    <TextField
                      className="inputRounded"
                      {...params}
                      size="small"
                      fullWidth
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={2}/>
            <Grid item md={5}>
              <FormControl fullWidth variant="outlined" required={true}>
                <InputLabel id="demo-multiple-checkbox-label" size="small">
                  Select country
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  label="Select country"
                  size="small"
                  value={selectedCountryName}
                  onChange={handleCountryChange}
                  className={"input-radius"}
                  renderValue={(selected) => selected}
                >
                  {countries.map((eachItem) => (
                    <MenuItem value={eachItem}>
                      <ListItemText primary={eachItem.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <br/>
              <br/>
              <FormControl fullWidth variant="outlined" required={true}>
                <InputLabel id="demo-multiple-checkbox-label" size="small">
                  Select state
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  label="Select state"
                  size="small"
                  disabled={stateDisable}
                  value={selectedStateName}
                  onChange={handleStateChange}
                  className={"input-radius"}
                  renderValue={(selected) => selected}
                >
                  {state.map((eachItem) => (
                    <MenuItem value={eachItem}>
                      <ListItemText primary={eachItem.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <br/>
              <br/>
              <FormControl fullWidth variant="outlined" required={true}>
                <InputLabel
                  id="demo-multiple-checkbox-label"
                  className="inputRounded"
                  size="small"
                >
                  Select City
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  label="Select City"
                  size="small"
                  className="input-radius"
                  disabled={cityDisable}
                  value={selectedCityName}
                  onChange={handleCityChange}
                  renderValue={(selected) => selected}
                >
                  {cities.map((eachItem) => (
                    <MenuItem value={eachItem}>
                      <ListItemText primary={eachItem.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <br/>
              <br/>
              {showMusicianDetails ? (
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label" size="small">
                    Select Instruments
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    size="small"
                    value={selectValue}
                    onChange={handleChange}
                    className={"input-radius"}
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
                            selectValue.indexOf(eachItem.instrumentName) > -1
                          }
                        />
                        <ListItemText primary={eachItem.instrumentName} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                ""
              )}

              {showNonMusicianDetails ? (
                <FormControl
                  required={true}
                  fullWidth
                  variant="outlined"
                  className={"form-wrapper"}
                >
                  <TextField
                    label="Intrests"
                    rows={4}
                    size="small"
                    multiline
                    className="inputSemiRounded"
                    id="standard-adornment-username"
                    type={"text"}
                    value={qualification}
                    onChange={qualificationChange}
                  />
                </FormControl>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <span
            className={"error-message"}
          >
            {cpasswordError}
          </span>{" "}
          <br/> <br/>
          <Button
            variant="contained"
            className={"button-update"}
            onClick={clickRegister}
          >
            &nbsp;UPDATE
          </Button>
          <br/>
          <br/>
        </DialogActions>
      </div>
      <Snackbar
        style={{
          whiteSpace: "pre-wrap",
          width: "300px"
        }}
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