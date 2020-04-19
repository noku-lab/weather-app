import React, { useState } from 'react';



const API = {
  key: 'c5f6f499dd5e849e0835d5e0dbb0e5a9',
  base: 'https://api.openweathermap.org/data/2.5/'
}
 const dateBuilder = (d) =>{
   let months = ["January", "February", "March", "April", "May", "June", "August",
    "September", "October", "November", "Decmber"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
 }

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search =(event) =>{
    if(event.key === "Enter")
    fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
    .then(res => res.json()) 
    .then(response => {
      setWeather(response)
      setQuery('');
      console.log(response)
    });
  }

  return (
    <div className= {(typeof window.main != "undefined") ? ((weather.main.temp > 18)? 'app': 'app winter'): 'app'}>
      <main>
        <div className = "search-form">
          <input
          type = "type"
          className = "search"
          placeholder = "Enter a city name"
          onChange = {e =>setQuery(e.target.value)}
          value = {query}
          onKeyPress = {search}
          />
        </div>

        {typeof weather.main != "undefined"?(
          <div>
        <div className = "location-box">
        <div className = "location">{weather.name}, {weather.sys.country} </div>
          <div className = "date">{dateBuilder(new Date())}</div>
        </div>
        <div className = "weather-box">
          <div className = "temp">
            {Math.round(weather.main.temp)}°C
          </div>
        <div className = "weather">{weather.weather[0].main}</div>
        </div>
        </div>): ('') }
      </main>
    </div>
  );
}

export default App;
