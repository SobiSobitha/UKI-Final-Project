const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User model
const router = express.Router();
require('dotenv').config();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Register as Volunteer
// Register as Volunteer
router.post('/register/volunteer', async (req, res) => {
  const { name, username, email, password } = req.body;

  // Input validation
  if (!name || !username || !email || !password) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ success: false, error: 'User already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, username, email, password: hashedPassword, role: 'volunteer', isApproved: true });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || '1h' });

      res.status(201).json({ success: true, message: 'Volunteer registration successful.', token });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Server error. Please try again.', details: err.message });
  }
});



// Register as Organizer
router.post('/register/Organizer', async (req, res) => {
  const { username, email, password } = req.body;

  // Input validation
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, error: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'Organizer', // Set role as organizer
      isApproved: false // Initially not approved
    });
    await newUser.save();
    res.status(201).json({ success: true, message: 'Registration successful: waiting for admin approval.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Registration failed', error });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      console.log('Fetched user:', user); // Debug log

      if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid email or password.' });
      }

      // Check if user is approved (for organizers)
// Check if user is approved (for organizers)
if (user.role === 'Organizer') {
  console.log('User approval status:', user.isApproved); // Debug log
  if (!user.isApproved) {
      return res.status(403).json({ success: false, message: 'Your account is pending admin approval.' });
  }
}


      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Invalid email or password.' });
      }

      // Generate JWT Token
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token, message: 'Login successful' });
  } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});


// Admin approval for organizers
router.post('/approve-organizer/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Check if the user is an organizer
    if (user.role !== 'Organizer') {
      return res.status(400).json({ success: false, message: 'Invalid request. User is not an organizer.' });
    }

    // Approve organizer
    user.approved = true;
    await user.save();

    res.json({ success: true, message: 'Organizer approved successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;
