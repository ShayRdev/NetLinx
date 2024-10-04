const express = require('express');
const path = require('path');
const logger = require('morgan');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const cors = require('cors'); // Import cors
const checkToken = require('./config/checkToken'); // Import your token middleware
const User = require('./models/User'); // Ensure you import your User model

require('dotenv').config();
require('./config/database');

const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST'], // Allowed methods
    credentials: true, // Allow credentials if needed
}));

// Configure AWS SDK
const s3Client = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Set up multer with S3
const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname); // Unique file name
        },
    }),
});

app.use(logger('dev'));
app.use(express.json());
app.use(checkToken); // Ensure token check middleware is applied

app.use(express.static(path.join(__dirname, 'dist')));

// File upload route
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        console.log('User:', req.user); // Log the user
        console.log('File:', req.file); // Log the uploaded file
        
        const userId = req.user._id; // Use _id for the user
        const profilePictureUrl = req.file.location; // URL from S3

        // Update user with the new profile picture URL
        await User.findByIdAndUpdate(userId, { profilePicture: profilePictureUrl });

        res.json({ fileUrl: profilePictureUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/comments', require('./routes/api/comments')); // Add comments route


// Catch all
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;

const server = app.listen(port, function() {
    console.log(`Express app running on port ${port}`);
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000" // Default to localhost for development
    }
});

io.on('connection', (socket) => {
    console.log('connected to socket.io');

    socket.on('postCreated', (postCreated) => {
        io.emit('postCreated', postCreated);
    });
});
