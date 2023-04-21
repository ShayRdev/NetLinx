const Post = require('../../models/post');

module.exports = {
    createPost,
    index,
    deletePost,
    updatePost
}

async function createPost(req, res) {
    try {
      const post = await Post.create(req.body.postData)
      const user = req.body.user._id;
      post.user = user;
      await post.save();
      res.json(post)
    } catch(error) {
        res.status(400).json(error)
    }
}

async function index(req, res) {
    const post = await Post.find({});
    res.json(post);
}

async function deletePost(req, res) {
    const id = req.params.id
    const deletedPost = await Post.findByIdAndDelete(id)
    res.json(deletedPost)
}



async function updatePost(req, res) {
    try {
      const id = req.params.id;
      const post = await Post.findById(id);
      post.subject = req.body.subject
      post.body = req.body.body
      await post.save();
      res.json(post);
    } catch (error) {
      res.status(400).json(error);
    }
  }