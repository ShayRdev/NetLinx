const express = require('express');
const router = express.Router();
const multer = require('multer');

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
router.post('/uploadProfilePicture', upload.single('profilePicture'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  // Here you can save the file information to your database if needed
  res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
});

module.exports = router;
