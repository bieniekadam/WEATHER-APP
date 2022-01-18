import React, { useEffect, useState } from "react";
import "./App.css";

const api = {
  key: "8dce728cd08823b7d378f01d69829b16",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("Warsaw");
  const [weather, setWeather] = useState({});
  const [background, setBackground] = useState("dupa");

  useEffect(() => {
    console.log(background);

    inheritBackground();
  }, [weather.weather]);

  useEffect(() => {
    search();
  }, []);

  function inheritBackground() {
    if (weather.weather) {
      setBackground(`app ${weather.weather[0].main.toLowerCase()}`);
    }
  }

  function eventHandler(event) {
    if (event.key === "Enter") {
      search();
    }
  }

  function search() {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        // console.log(result);
      });
  }

  function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={background}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={eventHandler}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="all-data">
            <div className="location-box">
              <div className="city">{weather.name}</div>
              <div className="country">{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
