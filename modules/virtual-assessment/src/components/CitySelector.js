// components/CitySelector.js
import React from 'react';

const CitySelector = ({ state, onSelect }) => {
  const cities = {
    Children: ['Before_meal1', 'after_meal1'],
    teen: ['Before_meal2', 'after_meal2'],
    adults: ['Before_meal3', 'after_meal3'],
    old_adults: ['Before_meal4', 'after_meal4'],
  };

  return (
    <div>
      <label>Select Category:</label>
      <select onChange={(e) => onSelect(e.target.value)} value="">
        <option value="">Select...</option>
        {cities[state] &&
          cities[state].map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CitySelector;
