const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const bcrypt = require('bcrypt');

router.post('/accounts/create', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user object and save it to the database
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        createdDatetime: new Date(),
        activeSessions: [],
      });    
    await newUser.save();

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete account
router.post('/accounts/delete', async (req, res) => {
    try {
        const { email, password } = req.body;
  
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
  
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // remove user from the database
        await User.findOneAndRemove({ email });

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
