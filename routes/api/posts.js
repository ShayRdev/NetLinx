const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts.js');
const ensureLoggedIn = require('../../config/ensureLoggedIn.js');

router.get('/', ensureLoggedIn, postsCtrl.index);
router.post('/posts', ensureLoggedIn, postsCtrl.createPost);
router.get('/:id', ensureLoggedIn, postsCtrl.getPostById);
router.delete('/:id', ensureLoggedIn, postsCtrl.deletePost);
router.put('/:id', ensureLoggedIn, postsCtrl.updatePost);
router.get('/user/:userId', postsCtrl.getPostsByUser);


module.exports = router;
