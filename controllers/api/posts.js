const Post = require('../../models/post');

module.exports = {
    createPost,
}

async function createPost(req, res) {
    try {
        console.log(req.body)
        console.log('controller')
      const post = await Post.create(req.body)
      console.log('controller', post)
      res.json(post)
    } catch(error) {
        res.status(400).json(error)
    }
}