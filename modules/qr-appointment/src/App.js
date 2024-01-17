// client/src/App.js
import React, { useState } from 'react';
import qrcode from 'qrcode'; // Import qrcode library for client-side generation

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = `Name: ${name}\nAge: ${parseInt(age) || 0}`;

    try {
      // Generate QR code locally on the client side
      const imgDataUrl = await qrcode.toDataURL(data);
      setQrCodeImage(imgDataUrl);
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
