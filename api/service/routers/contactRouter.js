import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST /submit - Handle contact form submissions
router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate request body
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save contact form data
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving contact form data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
