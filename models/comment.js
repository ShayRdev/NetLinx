const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post: { // Reference to the post the comment belongs to
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: { // Reference to the user who made the comment
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: { // The text of the comment
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Comment', commentSchema);
