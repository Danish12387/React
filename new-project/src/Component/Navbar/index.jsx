// function Navbar({func}) {
//     // const { func } = props;

//     function clickMe() {
//         const prmpt = prompt('Enter Your Name!');
//         func(prmpt);
//     };

//     return (
//         <div>
//             <button onClick={clickMe}>Click Me!</button>
//         </div>
//     )
// };

// export default Navbar;

import React from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function MapChart() {
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  )
}
