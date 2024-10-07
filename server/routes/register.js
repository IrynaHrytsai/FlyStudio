const express = require('express');
const Registration = require('../models/Registration'); 

const router = express.Router();


router.post('/', async (req, res) => {
  console.log('Received data:', req.body); 
  const { name, phone, classType } = req.body;

 
  if (!name || !phone || !classType) {
    return res.status(400).json({ message: 'Name, phone, and class type are required.' });
  }

  
  const phoneRegex = /^\+380\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number format. Use +380XXXXXXXXX.' });
  }

  const validClassTypes = ['Aerial Silks', 'Aerial hoop', 'Aerial yoga', 'Stretching'];
  if (!validClassTypes.includes(classType)) {
    return res.status(400).json({ message: 'Invalid class type selected.' });
  }

  try {
    const newRegistration = new Registration({ name, phone, classType });
    await newRegistration.save();
    return res.status(201).json({ success: true, message: 'Registration successful.' });
  } catch (error) {
    console.error('Error saving registration to database:', error);
    return res.status(500).json({ message: 'Error saving registration to database.' });
  }
});

module.exports = router;
