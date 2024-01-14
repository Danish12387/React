import React, { useEffect } from 'react';
import './App.css';
import Router from './config/router';
import Navbar from './component/Navbar';
import { GetAllProducts } from './config/firebase';

function App() {
  // Use useEffect to call GetAllProducts when the component mounts
  // useEffect(() => {
  //   GetAllProducts();
  // }, []);

  return (
    <div className="App">
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
