const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema ({
    groupName: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    Members: [String]
});

const Group = module.exports = mongoose.model('Group', GroupSchema);