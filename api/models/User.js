const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;