// components/PharmacyDetails.js
import React from 'react';

const PharmacyDetails = ({ pharmacy }) => {
  return (
    <div>
      <h2>{pharmacy.name}</h2>
      {/* Display other detailed information here if needed */}
    </div>
  );
};

export default PharmacyDetails;
