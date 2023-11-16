const btn = document.querySelector("#button-search");
let searchInput = document.querySelector("#search");
let inputValue = searchInput.value;

const ipAddressElement = document.getElementById("ip-address");
const locationElement = document.getElementById("location");
const timeZoneElement = document.getElementById("time-zone");
const ispElement = document.getElementById("isp");

var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marker; // Declare marker globally
let circle; // Declare circle globally

// Function to remove existing marker and circle
const removeMarkerAndCircle = function () {
  if (marker) {
    map.removeLayer(marker);
  }
  if (circle) {
    map.removeLayer(circle);
  }
};

// Function to add marker and circle
const addMarkerAndCircle = function (lat, lng) {
  marker = L.marker([lat, lng]).addTo(map);
  circle = L.circle([lat, lng], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
  marker.bindPopup("<b>You are Here!").openPopup();
};

//Automatically Fetch User-Data
const leafed_auto = function (result) {
  removeMarkerAndCircle(); // Remove existing marker and circle
  map.setView([result.latitude, result.longitude], 13);
  addMarkerAndCircle(result.latitude, result.longitude); // Add new marker and circle
};

//Automatically Fetch User-Data
const fetchUserIPdata = function () {
  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      renderData_auto(result);
      leafed_auto(result);
    });
};

window.addEventListener("load", fetchUserIPdata);

const renderData_auto = function (result) {
  searchInput.value = result.ip;
  ipAddressElement.innerText = result.ip;
  locationElement.innerText = `${result.region},${result.city},${result.country}`;
  timeZoneElement.innerText = `${result.utc_offset} , ${result.timezone}`;
  ispElement.innerText = result.org;
};

const fetchIPdata = function () {
  const inputValue = searchInput.value;

  const loadingSpinner = document.getElementById("loading-spinner");

  // Hide search button and show loading spinner
  btn.style.display = "none";
  loadingSpinner.style.display = "block";

  //   console.log(inputValue);

  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_dM3QxViBz1x1GNAVqqu4RKglkFTYi&ipAddress=${inputValue}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Invalid IP address");
      }
      return res.json();
    })
    .then((result) => {
      // Hide loading spinner on successful response and show search button
      loadingSpinner.style.display = "none";
      btn.style.display = "inline-block";

      // Hide loading spinner on successful response
      loadingSpinner.style.display = "none";

      renderData(result);
      leafed(result);

    }).catch((error) => {
      // Hide loading spinner on error and show search button
      loadingSpinner.style.display = "none";
      btn.style.display = "inline-block";

      console.error(error); // Log the error for debugging
      showToast(error.message);
    });
};

const renderData = function (result) {
  ipAddressElement.innerText = result.ip;
  locationElement.innerText = `${result.location.region},${result.location.city},${result.location.country}`;
  timeZoneElement.innerText = result.location.timezone;
  ispElement.innerText = result.isp;
};

btn.addEventListener("click", function (e) {
  e.preventDefault();
  fetchIPdata();
});

const leafed = function (result) {
  map.setView([result.location.lat, result.location.lng], 13);
  removeMarkerAndCircle(); // Remove existing marker and circle
  addMarkerAndCircle(result.location.lat, result.location.lng); // Add new marker and circle
};

// Function to display toast messages
const showToast = function (message) {
  const toastContainer = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};
