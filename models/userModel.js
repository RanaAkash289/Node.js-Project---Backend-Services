const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Add User Name"],
        message: "Please Add User Name"
    },
    email: {
        type: String,
        required: [true, "Please Add User Email"],
        unique: [true, "Email is already taken"]
    },
    password: {
        type: String,
        required: [true, "Please Add User Password"]
    },
}, {
    timestamp: true
});

module.exports = mongoose.model("user", Schema)