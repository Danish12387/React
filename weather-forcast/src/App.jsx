import './App.css';
// import Router from './config/router';
import { useEffect, useState } from 'react';
import humidity from './assets/humidity.webp';
import windDirec from './assets/wind direction.png';
import windSpeed from './assets/wind-speed.png';


function App() {

  const [data, setData] = useState({});
  const [Location, setLocation] = useState('karachi');
  const [newDate, setDate] = useState();
  const [localTime, setLocalTime] = useState();

  useEffect(() => {
    getWeather()
    if (localTime) {
      date()
    }
  }, [])

  if (!data) return <h2>Loading...</h2>

  console.log(localTime);

  function date() {
    const inputDate = new Date(localTime);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dayName = days[inputDate.getDay()];
    let hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();

    const amPm = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) {
      hours -= 12;
    }

    if (hours === 0) {
      hours = 12;
    }

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    setDate(`${dayName} ${formattedHours}:${formattedMinutes} ${amPm}`);
  }

  async function getWeather() {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3b90744069da4e9fa8853358230111&q=${Location}&aqi=no`);
      const data = await response.json();

      setData(data);
      setLocalTime(data.location.localtime);

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  return (
    <div>
      <nav>
        <div className="side">

          <div id="user-acc">Danish Shah</div>
          <div id="data">{newDate}</div>

        </div>
        <form id="form" onSubmit={(e) => e.preventDefault()} >
          <input onChange={(e) => setLocation(e.target.value)} type="text" id="input" placeholder="Search" />
          <button id="btn" onClick={getWeather}>Search</button>
          {/* <button>History</button> */}
        </form>
      </nav>
      <div id="weather-info">
        <div id='weather-box'>
          <div className="upper-box">
            <div><h2>{data?.location?.name}</h2></div>
            {/* <div><p>${dataDiv.innerHTML}</p></div> */}
            <div><img src={data?.current?.condition?.icon} /></div>
            <div className="temp"><p>{data?.current?.temp_c}<sup>o</sup>C</p></div>
            <div className="text"><h2>{data?.current?.condition?.text}</h2></div>
          </div>
          <div className="lower-box">
            <div className="boxes"><img src={humidity} /><span className='inner-text'>Humidity</span> {data?.current?.humidity}%</div>
            <div className="boxes"><img style={{width: '20px'}} src='https://www.freeiconspng.com/uploads/cloud-icon-22.png' /><span className='inner-text'>Cloud</span> {data?.current?.cloud}%</div>
            <div className="boxes"><img src={windSpeed} /><span className='inner-text'>Wind Speed</span> {data?.current?.wind_kph}kph</div>
            <div className="boxes"><img style={{width: '28px'}} src='https://static-00.iconduck.com/assets.00/visibility-icon-512x349-83wdi4gx.png' /><span className='inner-text'>Visibility</span> {data?.current?.vis_km}km</div>
          </div>
          <div className="lower-box">
            <div className="boxes"><img style={{width: '20px'}} src='https://static-00.iconduck.com/assets.00/temperature-feels-like-icon-495x512-ylzv705f.png' /><span className='inner-text'>Feels Like</span> <div>{data?.current?.feelslike_c}<sup>o</sup></div></div>
            <div className="boxes"><img src={windDirec} /><span className='inner-text'>Wind Directon</span> {data?.current?.wind_dir}</div>
            <div className="boxes"><span className='inner-text'>Country</span> {data?.location?.country}</div>
            <div className="boxes"><span className='inner-text'>Region</span> {data?.location?.region}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
