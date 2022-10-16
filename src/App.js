import { useState } from "react";
import { Helmet } from "react-helmet";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const API_KEY = process.env.REACT_APP_API_KEY

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
  const handleSearch = (e) => {
    e.preventDefault()
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data)
        console.log(data)
      })

    setLocation('')
  }
  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Weather App</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Weather App" />
      </Helmet>
      <div className="container">
        <div className="search">
          <form onSubmit={(e) => handleSearch(e)}>
            <input className="search"
              type="text"
              placeholder="Search for city"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </form>
        </div>
        {data.message && <h1>{data.message}</h1>}
        <div className="top">
          <div className="bold">
            <p>{data.name},{data.sys && data.sys.country}</p>
            {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
          </div>
          <div className="condition">
            {data.weather && <p>{data.weather[0].description}</p>}
          </div>
        </div>
        {data.name !== undefined && <div className="bottom">
          <div>
            {data.main && <p>{data.main.temp_max.toFixed()}°C</p>}
            <p>Max Temp</p>
          </div>
          <div>
            {data.main && <p>{data.main.temp_min.toFixed()}°C</p>}
            <p>Min Temp</p>
          </div>
          <div>
            {data.main && <p>{data.main.humidity}%</p>}
            <p>Humidity</p>
          </div>
          <div>
            {data.wind && <p>{data.wind.speed}</p>}
            <p>Wind speed</p>
          </div>
        </div>}

      </div>
    </div>
  );
}

export default App;
