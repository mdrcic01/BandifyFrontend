//This file is one -> it have all backend API calls
const BACKEND_APP_URL = "http://localhost:8080";


export const loginUser = (username,password) => {
    return fetch(BACKEND_APP_URL+"/api/authenticate", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "username":username,
              "password":password
              })
          });
}

export const getAllUsers = () => {
  return fetch(BACKEND_APP_URL+"/users_with_status", {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllMovies");
        })
}

export const getAllCurrency = () => {
  return fetch(BACKEND_APP_URL+"/currency", {
          method: "GET",
          headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllCurrency");
        })
}

export const getAllGenre = () => {
  return fetch(BACKEND_APP_URL+"/genre", {
          method: "GET",
          headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllGenre");
        })
}

export const getAllBands = () => {
  return fetch(BACKEND_APP_URL+"/band", {
          method: "GET",
          headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllGenre");
        })
}

export const getMyBand = () => {
  return fetch(BACKEND_APP_URL+"/band/owner/"+localStorage.getItem("userId"), {
          method: "GET",
          headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getMyBand");
        })
}

export const getBandById = (id) => {
  return fetch(BACKEND_APP_URL+"/band/"+id, {
          method: "GET",
          headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getBandById");
        })
}

export const deleteBandById = (id) => {
  return fetch(`${BACKEND_APP_URL}/band/${id}/${localStorage.getItem('userId')}`, {
          method: "DELETE",
          headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getBandById");
        })
}

export const registerUser = (fname, lname, username, password,role, date, selectedCountry, selectedState, 
  selectedCity, selectValue, selectAuthorityValue, qualification) => {
  console.log("register user called"+JSON.stringify({
                  "username":username,
                  "password":password,
                  "firstName":fname,
                  "lastname":lname,
                  "role":role,
                  "dateOfBirth": date,
                  "authorities": selectAuthorityValue,
                  "country":selectedCountry,
                  "state":selectedState,
                  "city":selectedCity,
                  "instruments":selectValue,
                  "intrests":qualification
                  }));
    return fetch(BACKEND_APP_URL+"/api/register", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "username":username,
              "password":password,
              "firstName":fname,
              "lastname":lname,
              "role":role,
              "dateOfBirth": date,
              "authorities": selectAuthorityValue,
              "country":selectedCountry,
              "state":selectedState,
              "city":selectedCity,
              "instruments":selectValue,
              "intrests":qualification
              })
          });
}

export const updateUser = (fname, lname, username, password,role, date, selectedCountry, selectedState, 
  selectedCity, selectValue, selectAuthorityValue, qualification) => {
    return fetch(BACKEND_APP_URL+"/api/update-user/"+localStorage.getItem("userId"), {
            method: "POST",
            headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
            body: JSON.stringify({
              "username":username,
              "password":password,
              "firstName":fname,
              "lastname":lname,
              "role":role,
              "dateOfBirth": date,
              "authorities": selectAuthorityValue,
              "country":selectedCountry,
              "state":selectedState,
              "city":selectedCity,
              "instruments":selectValue,
              "intrests":qualification
              })
          });
}

export const addBand = (bandName, price, selectValue, selectGenre, selectInstrumentValue) => {
 console.log(JSON.stringify({
  "bandName":bandName,
  "price":price,
  "currency":selectValue,
  "genre":selectGenre,
  "instruments":selectInstrumentValue,
  "userId": localStorage.getItem("userId")
  }));
    return fetch(BACKEND_APP_URL+"/band", {
            method: "POST",
            headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
            body: JSON.stringify({
              "bandName":bandName,
              "price":price,
              "currency":selectValue,
              "genre":selectGenre,
              "instruments":selectInstrumentValue,
              "userId": localStorage.getItem("userId")
              })
          });
}

export const saveApplication = (bandId) => {
     return fetch(BACKEND_APP_URL+"/application/"+bandId+"/"+localStorage.getItem('userId'), {
             method: "POST",
             headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
           });
 }

 export const updateApplicationStatus = (bandId, musicianId, status) => {
  return fetch(BACKEND_APP_URL+"/application/"+bandId+"/"+musicianId+"/"+status, {
          method: "POST",
          headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
        });
}

export const getAllApplication = (bandId) => {
  return fetch(BACKEND_APP_URL+"/application/"+bandId, {
          method: "GET",
          headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
        });
}

export const getAllApplicationStatus = () => {
  return fetch(BACKEND_APP_URL+"/application/musician/"+localStorage.getItem('userId'), {
          method: "GET",
          headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
        });
}

export const getUserDetailsById = () => {
  return fetch(BACKEND_APP_URL+"/user/"+localStorage.getItem('userId'), {
          method: "GET",
          headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
        });
}

export const editBand = (bandName, price, selectValue, selectGenre, selectInstrumentValue, id) => {
  console.log(JSON.stringify({
   "bandName":bandName,
   "price":price,
   "currency":selectValue,
   "genre":selectGenre,
   "instruments":selectInstrumentValue,
   "userId": localStorage.getItem("userId")
   }));
     return fetch(BACKEND_APP_URL+"/band/"+id, {
             method: "PUT",
             headers: {'Content-Type': 'application/json','Authorization': 'Bearer '+localStorage.getItem('token')},
             body: JSON.stringify({
               "bandName":bandName,
               "price":price,
               "currency":selectValue,
               "genre":selectGenre,
               "instruments":selectInstrumentValue,
               "userId": localStorage.getItem("userId")
               })
           });
 }
export const getUser = (email) => {
  return fetch(BACKEND_APP_URL+"/user/"+email, {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        });
}
export const editUsers = (fname, lname, email, password, role) => {
  console.log("register user called"+JSON.stringify({
                  "firstName":fname,
                  "lastName":lname,
                  "password":password,
                  "email":email,
                  "role":role,
                }));
  return fetch(BACKEND_APP_URL+"/user/"+localStorage.getItem("userId"), {
          method: "PUT",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
          body: JSON.stringify({
            "firstName":fname,
            "lastName":lname,
            "password":password,
            "email":email,
            "role":role,
            })
        });
}

export const getAllCountries = () => {
    return fetch(BACKEND_APP_URL+"/country", {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
          })
          .catch(error=>{
              console.log("Error while getAllCountries");
          })
}

export const getAllCities = (stateId) => {
  return fetch(BACKEND_APP_URL+"/city/bystate/"+stateId, {
          method: "GET",
          headers: {'Content-Type': 'application/json'},
        })
        .catch(error=>{
            console.log("Error while getAllCities");
        })
}

export const getAllInstruments = () => {
  return fetch(BACKEND_APP_URL+"/instrument", {
          method: "GET",
          headers: {'Content-Type': 'application/json'},
        })
        .catch(error=>{
            console.log("Error while getAllCities");
        })
}

export const getAllAuthorities = () => {
  return fetch(BACKEND_APP_URL+"/authority", {
          method: "GET",
          headers: {'Content-Type': 'application/json'},
        })
        .catch(error=>{
            console.log("Error while getAllCities");
        })
}

export const getAllStates = (countryId) => {
  return fetch(BACKEND_APP_URL+"/state/bycountry/"+countryId, {
          method: "GET",
          headers: {'Content-Type': 'application/json'},
        })
        .catch(error=>{
            console.log("Error while getAllStates", error);
        })
}

export const addMovie = (movieName, movieDesc, movieCast, movieGender,movieDuration,moviePoster) => {

   return fetch(BACKEND_APP_URL+"/movies", {
        method: "POST",
        headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        body: JSON.stringify({
                          "title":movieName,
                          "desc":movieDesc,
                          "cast":movieCast,
                          "genre":movieGender,
                          "duration":movieDuration,
                          "poster":moviePoster,
                          "adminId":localStorage.getItem("userId")
                      })
        });
 }

 
export const deleteMovies = (id) => {
  return fetch(BACKEND_APP_URL+"/movies/"+id+"/"+localStorage.getItem("userId"), {
    method: "DELETE",
    headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
  });
}

export const editMovie = (movieId, movieName, movieDesc, movieCast, movieGender,movieDuration,moviePoster) => {
  console.log("editHospitals called"+JSON.stringify({
    "title":movieName,
    "desc":movieDesc,
    "cast":movieCast,
    "genre":movieGender,
    "duration":movieDuration,
    "poster":moviePoster,
    "adminId":localStorage.getItem("userId")
}));
    return fetch(BACKEND_APP_URL+"/movies/"+movieId, {
            method: "PUT",
            headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
            body: JSON.stringify({
              "title":movieName,
              "desc":movieDesc,
              "cast":movieCast,
              "genre":movieGender,
              "duration":movieDuration,
              "poster":moviePoster,
              "adminId":localStorage.getItem("userId")
          })
          });
}


 export const getMovieById = (movieId) => {
  return fetch(BACKEND_APP_URL+"/movies/"+movieId, {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllUsers");
        })
}

export const bookMovie = (selectedSeat, theaterId, showId, movieId) => {
  return fetch(BACKEND_APP_URL+"/bookings", {
          method: "POST",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
          body: JSON.stringify({
            "theaterId":theaterId,
            "movieId":movieId,
            "showId":showId,
            "userId":localStorage.getItem("userId"),
            "seats":selectedSeat
        })
        })
        .catch(error=>{
            console.log("Error while getAllUsers");
        })
}

export const getViewMovies = (movieId) => {
  return fetch(BACKEND_APP_URL+"/moviesbook/"+movieId, {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllUsers");
        })
}

export const getBookingByUser= () => {
  return fetch(BACKEND_APP_URL+"/bookings/"+localStorage.getItem("userId"), {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getBookingByUser");
        })
}


export const getAllTheaters = (name) => {
  return fetch(BACKEND_APP_URL+"/theaters?search="+name, {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllTheaters");
        })
}

export const addTheater = (theaterName, noOfRows, noOfSeats, street,city,state) => {

 return fetch(BACKEND_APP_URL+"/theaters", {
      method: "POST",
      headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
      body: JSON.stringify({
                        "name":theaterName,
                        "noOfRows":noOfRows,
                        "noOfSeats":noOfSeats,
                        "street":street,
                        "city":city,
                        "state":state,
                        "adminId":localStorage.getItem("userId")
                    })
      });
}

export const addShowsToTheater = (selectDate, theaterId, movieId) => {

  return fetch(BACKEND_APP_URL+"/shows", {
       method: "POST",
       headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
       body: JSON.stringify({
                         "date":selectDate,
                         "theaterId":theaterId,
                         "movieId":movieId,
                         "adminId":localStorage.getItem("userId")
                     })
       });
 }

 export const saveModerators = (name, email, password) => {

  return fetch(BACKEND_APP_URL+"/moderator", {
       method: "POST",
       headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
       body: JSON.stringify({
                         "username":name,
                         "email":email,
                         "password":password,
                         "adminId":localStorage.getItem("userId")
                     })
       });
 }


 export const deleteTheaters = (id) => {
  return fetch(BACKEND_APP_URL+"/theaters/"+id+"/"+localStorage.getItem("userId"), {
    method: "DELETE",
    headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
  });
  }

export const deleteshows = (id, theaterId) => {
return fetch(BACKEND_APP_URL+"/shows/"+localStorage.getItem("userId")+"/"+theaterId+"/"+id, {
  method: "DELETE",
  headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
});
}

export const deleteModerators = (id) => {
  return fetch(BACKEND_APP_URL+"/moderator/"+localStorage.getItem("userId")+"/"+id, {
    method: "DELETE",
    headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
  });
  }

export const editTheater = (theaterId, theaterName, noOfRows, noOfSeats, street,city,state) => {
console.log("editHospitals called"+JSON.stringify({
                       "name":theaterName,
                        "noOfRows":noOfRows,
                        "noOfSeats":noOfSeats,
                        "street":street,
                        "city":city,
                        "state":state,
                        "adminId":localStorage.getItem("userId")
}));
  return fetch(BACKEND_APP_URL+"/theaters/"+theaterId, {
          method: "PUT",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
          body: JSON.stringify({
            "name":theaterName,
            "noOfRows":noOfRows,
            "noOfSeats":noOfSeats,
            "street":street,
            "city":city,
            "state":state,
            "adminId":localStorage.getItem("userId")
        })
        });
}


export const getTheaterById = (theaterId) => {
return fetch(BACKEND_APP_URL+"/theaters/"+theaterId, {
        method: "GET",
        headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
      })
      .catch(error=>{
          console.log("Error while getAllUsers");
      })
}

export const getAllModerators = () => {
  return fetch(BACKEND_APP_URL+"/moderators", {
          method: "GET",
          headers: {'Content-Type': 'application/json','token': ''+localStorage.getItem('token')},
        })
        .catch(error=>{
            console.log("Error while getAllUsers");
        })
  }