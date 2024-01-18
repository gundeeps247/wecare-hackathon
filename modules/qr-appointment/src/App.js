// client/src/App.js
import React, { useState } from 'react';
import qrcode from 'qrcode';
import './App.css'; // Import the CSS file

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState('');

  const generateAppointmentNumber = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentNumber = generateAppointmentNumber();
    const data = `Name: ${name}\nAge: ${parseInt(age) || 0}\nGender: ${gender}\nAddress: ${address}\nAppointment Number: ${appointmentNumber}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nConsent: ${consent ? 'Granted' : 'Not Granted'}`;

    try {
      const imgDataUrl = await qrcode.toDataURL(data);
      setQrCodeImage(imgDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div className="container">
      <h1>Patient Information Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={age} onChange={(e) => setAge(e.target.value)} />

        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="address">Address:</label>
        <textarea id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>
          <input type="checkbox" checked={consent} onChange={() => setConsent(!consent)} />
          I give my consent for medical treatment.
        </label>

        <button type="submit">Generate QR Code</button>
      </form>

      {qrCodeImage && <img src={qrCodeImage} alt="QR Code" />}
    </div>
  );
}

export default App;
