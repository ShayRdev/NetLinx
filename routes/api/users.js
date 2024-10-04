const express = require('express');
const router = express.Router();
const multer = require('multer');
const usersCtrl = require('../../controllers/api/users');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Change 'uploads/' to a path as needed

router.get('/check-token', usersCtrl.checkToken);
router.post('/', upload.single('file'), usersCtrl.create); // Use multer middleware here
router.post('/login', usersCtrl.login);
router.get('/:id', usersCtrl.getUserById); // Protect this route with token verification

module.exports = router;
