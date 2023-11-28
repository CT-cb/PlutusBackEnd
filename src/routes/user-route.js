const express = require('express');
const router = express.Router();
const User = require('../models/user-model'); 
const bcrypt = require('bcrypt');

/* IN auth-route.js ?? */
/* 
// Log in a user
router.post('/auth', async (req, res) => {
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
    // Verify the password (you may use a library like bcrypt for this)
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      // Here, you would typically generate and return a JWT for the user
      // to authenticate subsequent requests.For now, we'll just return a success message.
      res.status(200).json({ message: 'User logged in successfully' }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/

// Get user profile (protected route, requires authentication)
router.get('/profile', async (req, res) => {
  res.status(200).json(req.user); // Assuming that the authenticated user's data is available in req.user
});

// Update user profile (protected route, requires authentication!!)
router.put('/profile', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    // Get the authenticated user
    const user = req.user;

    // Update user profile fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await user.save();

    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Change user password (protected route, requires authentication!!)
router.put('/change-password', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
    
        // Get the authenticated user
        const user = req.user;
    
        // Verify the current password
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Incorrect current password' });
        }
    // Hash the new password and update the user's password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// List active sessions for a user (protected route, requires authentication!!)
router.get('/active-sessions', async (req, res) => {
    res.status(200).json(req.user.activeSessions);
});

// Log out a user (protected route, requires authentication!!)
router.post('/logout', async (req, res) => {
  // Implement user logout logic, which may include invalidating the JWT token
  res.status(200).json({ message: 'User logged out successfully' });
});

// Delete user account (protected route, requires authentication!!)
router.delete('/delete-account', async (req, res) => {
  // Implement user account deletion logic, which may include removing the user's data from the database
  res.status(200).json({ message: 'User account deleted successfully' });
});

// Forgot password (initiate password reset)
router.post('/forgot-password', async (req, res) => {
  // Implement the logic for initiating a password reset, which may involve sending a reset email
  res.status(200).json({ message: 'Password reset initiated' });
});

// Reset password using a reset token
router.put('/reset-password/:resetToken', async (req, res) => {
  // Implement password reset logic using the provided reset token
  res.status(200).json({ message: 'Password reset successful' });
});

module.exports = router;


