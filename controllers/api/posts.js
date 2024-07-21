const Post = require('../../models/post');
const User = require('../../models/user');

module.exports = {
    createPost,
    index,
    deletePost,
    updatePost,
    getPostById
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

  async function getPostById(req, res) {
    try {
        const id = req.params.id;
        const post = await Post.findById(id).populate('user', 'name');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}







// const Post = require('../../models/post');
// const User = require('../../models/user');

// module.exports = {
//     createPost,
//     index,
//     deletePost,
//     updatePost
// }

// async function createPost(req, res) {
//   try {
//     const postData = req.body;
//     const post = new Post(postData);
//     post.user = req.user._id;
//     await post.save();
//     res.json(post);
//   } catch(error) {
//     res.status(400).json(error);
//   }
// }
// async function index(req, res) {
//   try {
//     const posts = await Post.find({})
//       .populate('user')
//       .exec();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// async function deletePost(req, res) {
//     const id = req.params.id
//     const deletedPost = await Post.findByIdAndDelete(id)
//     res.json(deletedPost)
// }

// async function updatePost(req, res) {
//     try {
//       const id = req.params.id;
//       const post = await Post.findById(id);
//       post.subject = req.body.subject
//       post.body = req.body.body
//       await post.save();
//       const populatedPost = await post.populate('user', 'name').execPopulate(); // populate user field with only name
//       res.json(populatedPost);
//     } catch (error) {
//       res.status(400).json(error);
//     }
// }
