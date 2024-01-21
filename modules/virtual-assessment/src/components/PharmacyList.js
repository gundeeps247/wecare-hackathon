// components/PharmacyList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PharmacyList = ({ state, city }) => {
  const [pharmacyNames, setPharmacyNames] = useState([]);

  useEffect(() => {
    // Logic to determine pharmacy names based on the selected state, city, and area
    // Replace this with your own logic or fetch from an API if needed
    const pharmacyNamesForCombination = getPharmacyNamesForCombination(state, city);
    setPharmacyNames(pharmacyNamesForCombination);
  }, [state, city]);

  const getPharmacyNamesForCombination = (state, city) => {
    // Replace this logic with your own mapping or API calls
    // For example, you can have a mapping object like this:
    const pharmacyMapping = {
      'Children_Before_meal1_70-120': ['Remedy1', 'Remedy2'],
      'Children_Before_meal1_above_120': ['Remedy3', 'Remedy4'],
      'Children_after_meal1_less_than_140': ['Remedy1', 'Remedy2'], 
      'Children_after_meal1_140_or_above': ['Remedy1', 'Remedy2'],
      // Add more mappings for other combinations
    };

    const key = `${state}_${city}`;
    return pharmacyMapping[key] || [];
  };

  return (
    <div>
      <h2>Remedies</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {pharmacyNames.map((pharmacyName, index) => (
          <Link key={index} to={`/pharmacy/${pharmacyName}`}>
            <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', textAlign: 'left' }}>
              <h3>{pharmacyName}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PharmacyList;
