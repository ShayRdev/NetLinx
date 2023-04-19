const jwt = require('jsonwebtoken');
const Post = require('../../models/user');

module.exports = {
    createPost,
}

async function createPost(req, res) {
    try {
        const post = await Post.create(req.body)
        const token = createJWT(post)
        res.josn(token)

    } catch(error) {
        res.status(400).json(error)
    }
}

function createJWT(post) {
    return jwt.sign(
        { post }
    )
}