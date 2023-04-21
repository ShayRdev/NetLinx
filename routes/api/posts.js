const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts.js');
const ensureLoggedIn = require('../../config/ensureLoggedIn.js');

router.get('/', ensureLoggedIn, postsCtrl.index);
router.post('/posts', ensureLoggedIn, postsCtrl.createPost);
router.delete('/:id', ensureLoggedIn, postsCtrl.deletePost);
router.put('/:id', ensureLoggedIn, postsCtrl.updatePost);

module.exports = router;
