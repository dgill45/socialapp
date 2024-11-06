const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  activities: {
    type: [String], // Array of strings to store activities
    validate: [arrayLimit, '{PATH} exceeds the limit of 3'],
  },
  matchedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Helper function to limit the number of activities to 3
function arrayLimit(val) {
  return val.length <= 3;
}

module.exports = mongoose.model('User', UserSchema);
