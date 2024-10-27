import logo from './logo.svg';
import './App.css';
import api from './api/get'
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [houseData, setHouseData] = useState([]);

  useEffect(() => {
    const getHousingData = async () => {
      try {
        const response = await api.get('data?drilldowns=Year,State&measures=Average Wage,Average Wage Appx MOE&Record Count>=5&Workforce Status=true&Detailed Occupation=132011');
        if (response && response.data) setHouseData(response.data);
      } catch(err){
        if (err.response)console.log('🔴🔴🔴🔴🔴🔴🔴 ERROR ERROR ERROR: ',err.response);
        else console.log('Different error: ', err.message);
      }
    }
    getHousingData();
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button></button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
