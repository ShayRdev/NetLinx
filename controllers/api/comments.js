const Comment = require('../../models/comment');
const Post = require('../../models/post');
const User = require('../../models/user');

module.exports = {
    createComment,
    index,
    deleteComment,
    updateComment,
    getCommentsByPost
};

async function createComment(req, res) {
    try {
        const { postId, content } = req.body;
        const comment = new Comment({
            post: postId,
            content,
            user: req.user._id // Ensure req.user is populated correctly
        });
        
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: 'Error creating comment', error: error.message });
    }
}

async function index(req, res) {
    try {
        const comments = await Comment.find({})
            .populate('user', 'name profilePicture')
            .exec();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteComment(req, res) {
    const id = req.params.id;
    try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(deletedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateComment(req, res) {
    const id = req.params.id;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        comment.content = req.body.content; // Ensure you're updating the right field
        await comment.save();

        // Populate the user details after updating
        const populatedComment = await Comment.populate(comment, { path: 'user', select: 'name profilePicture' });
        res.json(populatedComment);
    } catch (error) {
        res.status(400).json({ message: 'Error updating comment', error: error.message });
    }
}

async function getCommentsByPost(req, res) {
    const postId = req.params.postId;
    try {
        const comments = await Comment.find({ post: postId })
            .populate('user', 'name profilePicture')
            .exec();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

