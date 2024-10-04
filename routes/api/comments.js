const express = require('express');
const router = express.Router();
const commentsCtrl = require('../../controllers/api/comments.js');
const ensureLoggedIn = require('../../config/ensureLoggedIn.js');

router.get('/', ensureLoggedIn, commentsCtrl.index);
router.post('/', ensureLoggedIn, commentsCtrl.createComment);
router.delete('/:id', ensureLoggedIn, commentsCtrl.deleteComment);
router.put('/:id', ensureLoggedIn, commentsCtrl.updateComment);
router.get('/post/:postId', ensureLoggedIn, commentsCtrl.getCommentsByPost); // Make sure this is consistent

module.exports = router;
