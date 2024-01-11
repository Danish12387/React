import './App.css';
import Router from './config/router';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router />
      
    </div>
  );
}

export default App;
