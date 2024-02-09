import React, { useEffect } from 'react';
import './App.css';
import Router from './config/router';
// import { GetAllProducts } from './config/firebase';
import store from './store/index';
import { Provider } from 'react-redux';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <div className='firstDIv'>
          <div className='router'>
            <Router />
          </div>
        </div>
        
      </div>
    </Provider>
  );
}

export default App;
