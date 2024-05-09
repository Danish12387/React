import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css';
import Router from './config/router';

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
{/* <PersistGate loading={null} persistor={persistor}></PersistGate> */}
export default App;
