const mongoose = require("mongoose");

const UserSchema = mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Contacts: [String]
});

const User = module.exports = mongoose.model('User', UserSchema);