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

const leafed_auto = function (result) {
  map.setView([result.latitude, result.longitude], 13);
  var marker = L.marker([result.latitude, result.longitude]).addTo(map);
  var circle = L.circle([result.latitude, result.longitude], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
  marker.bindPopup("<b>You are Here!").openPopup();
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

//Automatically Fetch User-Data
const fetchIPdata = function () {
  const inputValue = searchInput.value;
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
      renderData(result);
      leafed(result);
    }).catch((error) => {
      console.error(error); // Log the error for debugging
      showToast(error.message);
    });;
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
  var marker = L.marker([result.location.lat, result.location.lng]).addTo(map);
  var circle = L.circle([result.location.lat, result.location.lng], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
  marker.bindPopup("<b>You are Here!").openPopup();
};
