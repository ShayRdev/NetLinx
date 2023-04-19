const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const postSchema = new Post({
    subject: {type: String},
    body: {type: String},
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            return ret;
        }
    }
})