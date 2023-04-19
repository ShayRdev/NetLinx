const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts.js');


router.post('/', postsCtrl.create);

// router.post('/login', usersCtrl.login);
module.exports = router;
