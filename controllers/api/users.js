const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

// Create an S3 client
const s3Client = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

module.exports = {
    create,
    login,
    checkToken,
    getUserById
};

async function create(req, res) {
    try {
        let fileUrl = '';

        // Check if a file is uploaded
        if (req.file) {
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: `uploads/${req.file.originalname}`, // Use original name or generate a unique one
                Body: fs.createReadStream(req.file.path), // Use a readable stream
                ContentType: req.file.mimetype,
            };

            // Uploading files to the bucket
            const uploadResult = await s3Client.send(new PutObjectCommand(params));
            console.log("Successfully uploaded file: ", uploadResult);
            fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/uploads/${req.file.originalname}`; // Construct the file URL
        }

        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profilePicture: fileUrl, // Save the profile picture URL
        };

        const user = await User.create(userData);
        const token = createJWT(user);
        res.json({ token, user }); // Include user data in response
    } catch (error) {
        console.error("Error creating user: ", error);
        res.status(400).json(error);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        res.json(createJWT(user));
    } catch {
        res.status(400).json('Bad Credentials');
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user);
    res.json(req.exp);
}

async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}
