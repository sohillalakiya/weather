import './App.css';
import 'dotenv/config';
import React, { useEffect, useState } from 'react';
import WeatherCard from './component/weatherCard';

function App() {
  const [searchValue, setSearchValue] = useState("Surat");
  const [weatherInfo, setWeatherInfo] = useState({})

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${process.env.WEATHER_API}`
      const data = await fetch(url);
      const res = await data.json();

      const { temp, humidity, pressure } = res.main;
      const { main: weatherMood } = res.weather[0];
      const { name: cityName } = res;
      const { speed: windSpeed } = res.wind;
      const { country, sunset } = res.sys;

      setWeatherInfo({
        temp, humidity, pressure, weatherMood, cityName, windSpeed, country, sunset
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, [])


  return (
    <div>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={() => getWeatherInfo()}
          >
            Search
          </button>
        </div>
      </div>
      <WeatherCard data={weatherInfo} />
    </div>

  );
}

export default App;
