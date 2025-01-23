import React, { useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherIcon = (condition, temp) => {
    if (temp <= 0) return snow_icon;
    if (condition.includes('snow')) return snow_icon;
    if (condition.includes('drizzle')) return drizzle_icon;
    if (condition.includes('rain')) return rain_icon;
    if (condition.includes('cloud')) return cloud_icon;
    return clear_icon; // Default to clear for other conditions
  };

  const searchWeather = async (city) => {
    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=0b146a3c1a5a4bebbff150019252201&q=${city}&aqi=yes`;
      const response = await fetch(url);
      const data = await response.json();
      const condition = data.current.condition.text.toLowerCase();
      const temperature = Math.floor(data.current.temp_c);

      setWeatherData({
        temperature: temperature,
        location: data.location.name,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        icon: getWeatherIcon(condition, temperature),
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = () => {
    const city = document.querySelector('.search-bar input').value;
    if (city) {
      searchWeather(city);
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <img src={search_icon} alt="Search Icon" onClick={handleSearch} />
      </div>
      {weatherData && (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity Icon" className="humidityweather-icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Icon" className="windweather-icon" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
