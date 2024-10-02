const multer = require('multer');
const path = require('path');

// Configure Multer storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); // Define where to store the uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Append timestamp to the file name
  }
});

// Define the file filter to validate the type of files
const fileFilter = (req, file, cb) => {
  // Only accept image files (jpeg, png, etc.)
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Not an image! Please upload only images.'), false); // Reject the file
  }
};

// Initialize multer with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

// Controller for handling file upload
const uploadProfilePicture = (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  // File upload successful, process it here (e.g., save to DB, send file URL)
  res.status(200).json({
    message: 'Profile picture uploaded successfully!',
    file: req.file // Optionally return file info
  });
};

// Export the controller and middleware
module.exports = {
  uploadProfilePicture,
  uploadMiddleware: upload.single('profilePicture') // Expecting the field name 'profilePicture'
};
