const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    subject: {type: String},
    body: {type: String},
}, {
    timestamps: true,
   
})

module.exports = mongoose.model('Post', postSchema)