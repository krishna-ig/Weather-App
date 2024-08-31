// const city = "New York"; // Replace with the city name you want to search for

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "ca1f9a1e4emsha6b7bf40d982797p1cbcf0jsn2a6907e6f43f",
    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
  },
};

const dewpoint_c = document.getElementById("dewpoint_c");
const feelslike_c = document.getElementById("feelslike_c");
const heatindex_c = document.getElementById("heatindex_c");
const humidity = document.getElementById("humidity");
const temp_c = document.getElementById("temp_c");
const temp_f = document.getElementById("temp_f");
const feelslike_f = document.getElementById("feelslike_f");
const last_updated = document.getElementById("last_updated");
const forecast = document.getElementById("forecast");

const getWeather = (city) => {
  cityname.innerHTML = city;
  fetch(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${encodeURIComponent(
      city
    )}&days=5`, // Fetching 5-day forecast
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      dewpoint_c.innerHTML = response.current.dewpoint_c;
      feelslike_c.innerHTML = response.current.feelslike_c;
      heatindex_c.innerHTML = response.current.heatindex_c;
      humidity.innerHTML = response.current.humidity;
      temp_c.innerHTML = response.current.temp_c;
      temp_f.innerHTML = response.current.temp_f;
      feelslike_f.innerHTML = response.current.feelslike_f;
      last_updated.innerHTML = response.current.last_updated;

      // Display forecast data
      forecast.innerHTML = ""; // Clear previous forecast
      response.forecast.forecastday.forEach((day) => {
        const date = day.date;
        const avgTempC = day.day.avgtemp_c;
        const condition = day.day.condition.text;
        const conditionIcon = day.day.condition.icon;

        const forecastHtml = `
          <div>
            <h3>${date}</h3>
            <p>Average Temperature: ${avgTempC} °C</p>
            <p>Condition: ${condition}</p>
            <img src="${conditionIcon}" alt="${condition}" />
          </div>
        `;
        forecast.innerHTML += forecastHtml;
      });
    })
    .catch((err) => console.error(err));
};

submit.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(city.value);
});

getWeather("delhi");

// using current location
// Using current location
function getWeatherForCurrentLocation() {
  cityname.innerHTML = "Current Location";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Fetch weather data using the current location
  fetch(
    `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${latitude},${longitude}&days=5`, // Fetching 5-day forecast
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      dewpoint_c.innerHTML = response.current.dewpoint_c;
      feelslike_c.innerHTML = response.current.feelslike_c;
      heatindex_c.innerHTML = response.current.heatindex_c;
      humidity.innerHTML = response.current.humidity;
      temp_c.innerHTML = response.current.temp_c;
      temp_f.innerHTML = response.current.temp_f;
      feelslike_f.innerHTML = response.current.feelslike_f;
      last_updated.innerHTML = response.current.last_updated;

      // Display forecast data
      forecast.innerHTML = ""; // Clear previous forecast
      response.forecast.forecastday.forEach((day) => {
        const date = day.date;
        const avgTempC = day.day.avgtemp_c;
        const condition = day.day.condition.text;
        const conditionIcon = day.day.condition.icon;

        const forecastHtml = `
          <div>
            <h3>${date}</h3>
            <p>Average Temperature: ${avgTempC} °C</p>
            <p>Condition: ${condition}</p>
            <img src="${conditionIcon}" alt="${condition}" />
          </div>
        `;
        forecast.innerHTML += forecastHtml;
      });
    })
    .catch((err) => console.error(err));
}

function errorCallback(error) {
  console.error("Geolocation error:", error);
  alert("Unable to retrieve your location. Please allow location access.");
}

// Attach event listener to button
document
  .getElementById("use-location")
  .addEventListener("click", getWeatherForCurrentLocation);
