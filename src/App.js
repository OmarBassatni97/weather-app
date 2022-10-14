import { useState } from "react";

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0aac12e5e68ee06ddfb3f734501c6105&units=metric`
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
            <p>{data.name}</p>
            {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
          </div>
          {data.weather && <p>{data.weather[0].main}</p>}
        </div>
        {data.name !== undefined && <div className="bottom">
          <div>
            {data.main && <p>{data.main.temp.toFixed()}°C</p>}
            <p>Feels like</p>
          </div>
          <div>
            {data.main && <p>{data.main.humidity}</p>}
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
