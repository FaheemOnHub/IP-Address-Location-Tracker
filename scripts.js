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

const fetchIPdata = function () {
  const inputValue = searchInput.value;
  //   console.log(inputValue);
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_dM3QxViBz1x1GNAVqqu4RKglkFTYi&ipAddress=${inputValue}`
  )
    .then((res) => res.json())
    .then((result) => {
      renderData(result);
      leafed(result);
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
  var marker = L.marker([result.location.lat, result.location.lng]).addTo(map);
  var circle = L.circle([result.location.lat, result.location.lng], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
  marker.bindPopup("<b>You are Here!").openPopup();
};
