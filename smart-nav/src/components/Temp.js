import React, { useState, useEffect } from "react";
import "./Temp.css";
import cloud from "./images/cloud.png";
import clear from "./images/clear.png";
import rain from "./images/rain.png";
import snow from "./images/snow.png";
import mist from "./images/mist.png";
import error from "./images/404.png";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;

const Temp = ({defaultLocation}) => {
  const [searchData, setSearchData] = useState(defaultLocation || "Dehradun");
  const [weatherData, setWeatherData] = useState({});
  const [errorFound, setErrorFound] = useState(false);

  const getWeather = async () => {
    try {
      let url = `${baseUrl}?q=${searchData}&units=metric&appid=${weatherKey}`;
      let res = await fetch(url);
      if (res.ok) {
        let data = await res.json();
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { main: weatherMood } = data.weather[0];
        const weatherInfo = {
          temp,
          humidity,
          speed,
          weatherMood,
        };
        setWeatherData(weatherInfo);
        setErrorFound(false);
      } else {
        setErrorFound(true);
      }
    } catch (error) {
      console.log(error);
      setErrorFound(true);
    }
  };

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getImageForWeatherMood = (weatherMood) => {
    switch (weatherMood) {
      case "Clouds":
        return cloud;
      case "Haze":
      case "Mist":
        return mist;
      case "Clear":
        return clear;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      default:
        return cloud;
    }
  };

  return (
    <div className="container">
      <div className="search-box">
        <i className="bx bxs-map"></i>
        <input
          type="text"
          placeholder="enter location"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <button className="bx bx-search" onClick={getWeather}></button>
      </div>

      {errorFound && (
        <div className="error-box">
          <img src={error} alt="Error Icon" />
          <p className="error-message">Location not found. Please try again.</p>
        </div>
      )}

      {!errorFound && (
        <div>
          <div className="weather-box">
                <div className="weather">
                  <img src={getImageForWeatherMood(weatherData.weatherMood)} alt="Weather Icon" />
                  <p className="temperature">
                    {weatherData.temp}
                    <span>°C</span>
                  </p>
                  <p className="description">{weatherData.weatherMood}</p>
                </div>
          </div>

          <div className="weather-details">
            <div className="humidity">
              <i className="bx bx-water"></i>
              <div className="text">
                <div className="info-humidity">
                  <span>{weatherData.humidity}%</span>
                </div>
                <p>Humidity</p>
              </div>
            </div>
            <div className="wind">
              <i className="bx bx-wind"></i>
              <div className="text">
                <div className="info-wind">
                  <span>{weatherData.speed}Km/h</span>
                </div>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Temp;
