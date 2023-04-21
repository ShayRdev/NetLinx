const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts.js');
const ensureLoggedIn = require('../../config/ensureLoggedIn.js');

router.get('/', postsCtrl.index);
router.post('/posts', postsCtrl.createPost);
router.delete('/:id', postsCtrl.deletePost);
router.put('/:id', postsCtrl.updatePost);

module.exports = router;
