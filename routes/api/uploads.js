const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../../models/user'); // Adjust the path according to your project structure

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/', // Set your upload destination
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename the file to avoid conflicts
  },
});

// Initialize upload variable with multer
const upload = multer({ storage });

// Route to handle file upload
router.post('/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const userId = req.body.userId; // Ensure userId is sent in the request body

    // Update the user profile picture in the database
    await User.findByIdAndUpdate(userId, { profilePicture: req.file.path }, { new: true });

    res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
  } catch (error) {
    console.error('Error saving profile picture:', error);
    res.status(500).json({ message: 'Error saving profile picture', error });
  }
});

module.exports = router;
