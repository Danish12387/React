import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css';
import Router from './config/router';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <div className='firstDIv'>
            <div className='router'>
              <Router />
            </div>
          </div>

        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
