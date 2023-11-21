import axios from "axios"; // built in typescript support for axios
declare var google: any
const form = document.querySelector("form")!; // ! means that we are sure that form exists
const addressInput = document.getElementById("address")! as HTMLInputElement; // this is of type HTMLInputElement
const GOOGLE_API_KEY = "YOUR_API_KEY"; // get your own api key from google cloud platform, Maps and Places API
type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
}; // this is a type that we are creating

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // sending this to googles api
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((resp) => {
      if (resp.data.status !== "OK") {
        throw new Error("Could not fetch location");
      }

      const cordinates = resp.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: cordinates,
        zoom: 16,
      });

      new google.maps.Marker({ position: cordinates, map: map }); // marker for the map
    })
    .catch((err) => alert(err.message)); // encodeURI is a built in function to encode the address to a valid url
}

form.addEventListener("submit", searchAddressHandler);
