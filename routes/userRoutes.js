const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUserProfile,
        getMatchedUsers, 
        addActivities, 
        getUserActivities } = require('../controllers/userController');

// Get User Profile - Protected Route
router.get('/profile', auth, getUserProfile);

// Route to add or update activities - protected route
router.post('/activities', auth, addActivities);

// Route to get activities of the logged-in user - protected route
router.get('/activities', auth, getUserActivities);

// Route to get matched users based on activities - protected route
router.get('/matches', auth, getMatchedUsers);

module.exports = router;
