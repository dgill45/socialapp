const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getOrCreateThread, addPost } = require('../controllers/threadController');

// Route to get or create a thread - protected route
router.post('/thread', auth, getOrCreateThread);

// Route to add a post to a thread - protected route
router.post('/thread/post', auth, addPost);

module.exports = router;
