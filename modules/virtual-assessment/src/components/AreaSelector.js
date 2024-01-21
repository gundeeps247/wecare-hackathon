
// components/AreaSelector.js
import React from 'react';

const AreaSelector = ({ city, onSelect }) => {
  const areas = {
    Before_meal1: ['70-120', 'above_120'],
    After_meal1: ['less_than_140', '140_or_above'],
    Before_meal2: ['70-90', 'above_90'],
    After_meal2: ['up_to_140', 'above_140'],
    Before_meal3: ['70-125', 'more_than_125'],
    After_meal3: ['less_than_140', 'more_than_140'],
    Before_meal4: ['70-125', 'more_than_125'],
    After_meal4: ['less_than_140', 'more_than_140']
  };

  return (
    <div>
      <label>Select BP:</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select...</option>
        {areas[city] &&
          areas[city].map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
      </select>
    </div>
  );
};

export default AreaSelector;

