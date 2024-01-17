// server.js
const express = require('express');
const qrcode = require('qrcode');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json()); // Parse JSON requests

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.post('/generate_qrcode', express.urlencoded({ extended: true }), async (req, res) => {
  const { name, age } = req.body;
  const data = `Name: ${name}\nAge: ${parseInt(age) || 0}`;

  try {
    const imgDataUrl = await qrcode.toDataURL(data);
    res.send(imgDataUrl);
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
