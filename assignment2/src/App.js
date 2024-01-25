import React, { useEffect } from 'react';
import './App.css';
import Router from './config/router';
// import { GetAllProducts } from './config/firebase';

function App() {

  return (
    <div className="App">
        <div className='firstDIv'>
          <div className='router'>
            <Router />
          </div>
        </div>
      </div>
  );
}

export default App;
