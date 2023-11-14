# IP address tracker

![Design preview for the IP address tracker coding challenge](./design/desktop-preview.jpg)

# IP Address Tracker 🌐

## Overview

IP Address Tracker is a web application that allows users to track the geographical location of a given IP address. The application provides information such as the IP address, location (including city, region, and country), timezone, and Internet Service Provider (ISP). Additionally, the location is displayed on an interactive map using Leaflet.js.

## Features

- **User-Friendly Interface:** The application has a clean and intuitive user interface, making it easy for users to input an IP address and retrieve location details.

- **Automatic Location Retrieval:** On page load, the application automatically fetches the user's IP address and displays relevant location information.

- **Interactive Map:** The geographical location is visually represented on an interactive map using Leaflet.js, allowing users to explore the location in more detail.

## Usage

1. Enter an IP address in the input field.
2. Click the "Search" button to retrieve location details.
3. Explore the location on the interactive map.

## Technologies Used

- HTML, CSS for frontend design.
- JavaScript for dynamic functionality.
- Leaflet.js for map integration.
- [ipapi](https://ipapi.co/) and [ipify](https://geo.ipify.org/) APIs for IP address information.

## How to Run

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser.

## API Keys

To use the application, you need to obtain API keys from [ipify](https://geo.ipify.org/). Replace the placeholder `apiKey` in the JavaScript code with your own API key.

```javascript
// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'YOUR_API_KEY';

// ...

// Fetch data using the API key
fetch(
  `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${inputValue}`
)
  .then((res) => res.json())
  .then((result) => {
    // Process the result
  });
```

## Credits

- [Leaflet.js](https://leafletjs.com/) for interactive maps.
- [ipapi](https://ipapi.co/) and [ipify](https://geo.ipify.org/) for IP address information.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributors
-[FaheemOnHub](https://github.com/FaheemOnHub)
-[PG-257811](https://github.com/PG-257811)

Feel free to contribute to the project by opening issues or submitting pull requests!

Happy tracking! 🌍✨
**Have fun building!** 🚀
# IP-Address-Location-Tracker
