// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StateSelector from './components/StateSelector';
import CitySelector from './components/CitySelector';
import AreaSelector from './components/AreaSelector';
import PharmacyList from './components/PharmacyList';
import PharmacyDetails from './components/PharmacyDetails';

const App = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={(
            <div>
              <StateSelector onSelect={(state) => setSelectedState(state)} />
              {selectedState && (
                <CitySelector state={selectedState} onSelect={(city) => setSelectedCity(city)} />
              )}
              {selectedCity && (
                <AreaSelector city={selectedCity} onSelect={(area) => setSelectedArea(area)} />
              )}
              {selectedArea && (
                <Link to={`/pharmacies/${selectedState}/${selectedCity}/${selectedArea}`}>
                  <button>Show Pharmacies</button>
                </Link>
              )}
            </div>
          )}
        />
        <Route
          path="/pharmacies/:state/:city/:area"
          element={<PharmacyList />}
        />
        <Route
          path="/pharmacy/:pharmacyName"
          element={<PharmacyDetails />}
        />
      </Routes>
    </Router>
  );
};

export default App;
