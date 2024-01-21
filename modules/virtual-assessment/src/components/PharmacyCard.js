// components/PharmacyCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const PharmacyCard = ({ pharmacy }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', width: '200px', textAlign: 'left' }}>
      <Link to={`/pharmacy/${pharmacy.name}`}>
        <h3>{pharmacy.name}</h3>
      </Link>
    </div>
  );
};

export default PharmacyCard;
