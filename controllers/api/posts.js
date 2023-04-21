const Post = require('../../models/postSchema');

module.exports = {
    createPost,
    index,
    deletePost
}

async function createPost(req, res) {
    try {
      const post = await Post.create(req.body)
      res.json(post)
    } catch(error) {
        res.status(400).json(error)
    }
}

async function index(req, res) {
    console.log('INSIDE CTRLR FUNCTION')
    const post = await Post.find({});
    console.log(post, 'POST IN CONTROLLER')
    res.json(post);
}

async function deletePost(req, res) {
    const id = req.params.id
    const deletedPost = await Post.findByIdAndDelete(id)
    console.log(deletedPost)
    res.json(deletedPost)
}