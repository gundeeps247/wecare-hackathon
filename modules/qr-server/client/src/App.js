// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/generate_qrcode', { name, age });
      setQrCodeImage(response.data);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div>
      <h1>Enter Your Information</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={age} onChange={(e) => setAge(e.target.value)} /><br /><br />
        <button type="submit">Generate QR Code</button>
      </form>

      {qrCodeImage && <img src={qrCodeImage} alt="QR Code" />}
    </div>
  );
}

export default App;
