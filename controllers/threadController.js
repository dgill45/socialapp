const Thread = require('../models/Thread');

// Create or Get a Thread for an Activity
exports.getOrCreateThread = async (req, res) => {
  const { activityName } = req.body;

  try {
    // Find the thread for the given activity or create a new one
    let thread = await Thread.findOne({ activityName });
    if (!thread) {
      thread = new Thread({ activityName });
      await thread.save();
    }

    res.json(thread);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Add a Post to a Thread
exports.addPost = async (req, res) => {
  const { activityName, content } = req.body;

  try {
    // Find the thread for the given activity
    const thread = await Thread.findOne({ activityName });
    if (!thread) {
      return res.status(404).json({ msg: 'Thread not found' });
    }

    // Add the new post
    const newPost = {
      userId: req.user,
      content,
    };
    thread.posts.push(newPost);
    await thread.save();

    res.json(thread);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
