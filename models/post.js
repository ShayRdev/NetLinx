const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    subject: {type: String},
    body: {type: String},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    username: {type: String}
}, {
    timestamps: true,
})

module.exports = mongoose.model('Post', postSchema)