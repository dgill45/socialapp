const User = require('../models/User');

// Add or Update User Activities
exports.addActivities = async (req, res) => {
  const { activities } = req.body;

  // Validate that we don't exceed 3 activities
  if (!Array.isArray(activities) || activities.length > 3) {
    return res.status(400).json({ msg: 'You can only add up to 3 activities.' });
  }

  try {
    // Find the user and update their activities
    const user = await User.findByIdAndUpdate(
      req.user, // `req.user` comes from authentication middleware
      { activities },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get User Activities
exports.getUserActivities = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('activities');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user.activities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get Matched Users Based on Activities
exports.getMatchedUsers = async (req, res) => {
    try {
      // Find the logged-in user's activities
      const user = await User.findById(req.user);
      if (!user || user.activities.length === 0) {
        return res.status(400).json({ msg: 'Please add some activities first.' });
      }
  
      // Find users who have at least one matching activity
      const matchedUsers = await User.find({
        _id: { $ne: req.user }, // Exclude the current user
        activities: { $in: user.activities },
      }).select('username activities');
  
      res.json(matchedUsers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  