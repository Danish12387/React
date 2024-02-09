import { useState } from 'react';
import './App.css';
// import Navbar from './Component/Navbar';
import MapChart from './Component/Navbar';

function App() {
  const [text, setText] = useState('Click on the above button to change text!');

  const changetxt = (para) => {
    setText(para)
  }

  return (
    <div>
      {/* <Navbar func={changetxt} /> */}
      <MapChart/>
      <h2>{text}</h2>
    </div>
  )
}

export default App;
