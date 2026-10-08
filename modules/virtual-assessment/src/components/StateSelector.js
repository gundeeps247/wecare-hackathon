// components/StateSelector.js
import React from 'react';

const StateSelector = ({ onSelect }) => {
  const states = {
    Children: ['Before_meal1', 'after_meal1'],
    teen: ['Before_meal2', 'after_meal2'],
    adults: ['Before_meal3', 'after_meal3'],
    old_adults: ['Before_meal4', 'after_meal4'],
  };

  return (
    <div>
      <label>Select Age:</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select...</option>
        {Object.keys(states).map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateSelector;
