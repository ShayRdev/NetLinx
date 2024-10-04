const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = new Schema({
    subject: {type: String},
    body: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    username: {type: String},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // Change to an array of Comment ObjectIds

}, {
    timestamps: true,
})

module.exports = mongoose.model('Post', postSchema)