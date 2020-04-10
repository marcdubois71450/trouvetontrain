import Geocode from "react-geocode";
//This code was created by Marc Dubois
const GOOGLE_API_KEY = "AIzaSyBpHSE7RyT9RXElOHMjtYqkYLaUWSi-cRA";

export function geocodeSearch(searchKeyWord) {
    return new Promise((resolve, reject) => {
      Geocode.setApiKey(GOOGLE_API_KEY);
      Geocode.setLanguage("FR");
      Geocode.setRegion("FR");
      Geocode.fromAddress(searchKeyWord+",FR").then(
        response => {
          resolve({
            formatted_address: response.results[0].formatted_address,
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng,
            formatted_address_state: true
          })
        },
        error => {
          console.log("error with:", searchKeyWord);
          console.log(error);
          reject(false);
        }
      );
    })
}
