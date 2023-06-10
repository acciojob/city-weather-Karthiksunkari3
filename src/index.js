import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const apiKey = 'YOUR_API_KEY';
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const weatherDisplay = document.querySelector('.weather');

// Function to fetch weather data from OpenWeatherMap API
const getWeatherData = async (query) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch weather data');
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to update the weather display
const updateWeatherDisplay = (weatherData) => {
  const temperature = weatherData.main.temp;
  const description = weatherData.weather[0].description;
  const iconCode = weatherData.weather[0].icon;

  // Convert temperature from Kelvin to Celsius
  const temperatureCelsius = Math.round(temperature - 273.15);

  // Create HTML elements for displaying weather data
  const temperatureElement = document.createElement('p');
  temperatureElement.textContent = `Temperature: ${temperatureCelsius}°C`;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = `Description: ${description}`;

  const iconElement = document.createElement('img');
  iconElement.src = `http://openweathermap.org/img/w/${iconCode}.png`;

  // Clear previous weather data
  weatherDisplay.innerHTML = '';

  // Append weather data elements to the weather display
  weatherDisplay.appendChild(temperatureElement);
  weatherDisplay.appendChild(descriptionElement);
  weatherDisplay.appendChild(iconElement);
};

// Event listener for search button click
searchButton.addEventListener('click', async () => {
  const query = searchInput.value;
  if (query) {
    const weatherData = await getWeatherData(query);
    if (weatherData) {
      updateWeatherDisplay(weatherData);
    }
  }
});


ReactDOM.render(<App />, document.getElementById("root"));
