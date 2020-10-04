import Geocode from "react-geocode";
//This code was created by Marc Dubois

const GOOGLE_API_KEY = "API-KEY";

if (GOOGLE_API_KEY == "API-KEY") {
  console.log("Please set your google api key, check https://console.cloud.google.com/apis/credentials");
}

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
