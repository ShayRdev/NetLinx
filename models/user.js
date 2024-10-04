const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SALT_ROUNDS = 6;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true
    },
    profilePicture: { // New field for the profile picture
        type: String, // This can be the filename or URL
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password; // Remove password from the returned JSON
            return ret;
        }
    }
});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});

// Check if the model already exists to avoid overwrite error
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
