const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts.js');


router.post('/', postsCtrl.createPost);
router.get('/', postsCtrl.index);
module.exports = router;
