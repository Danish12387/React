import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [ data, setData ] = useState({});
  
  useEffect(()=>{
    fetch(`https://api.weatherapi.com/v1/current.json?key=3b90744069da4e9fa8853358230111&q=${location}&aqi=no`)
    .then(response => response.json())
    .then(res => setData(res))
  },[])

  console.log(data);
  
  if(!data) return <h2>Loading...</h2>
  // const {location: {name}} = data;

  // console.log(name);

  return (
    <div>
      <nav>
        <div className="side">

          <div id="user-acc">Danish Shah</div>
          <div id="data"></div>

        </div>
        <form id="form" onSubmit={(e)=> e.preventDefault()} >
          <input type="text" id="input" placeholder="Search"/>
            <button id="btn">Search</button>
        </form>
      </nav>
      <h1 id="head">Search for weather</h1>
      <div id="weather-info">
        
      </div>
    </div>
  )
}

export default App
