const mongoos = require("mongoose");

// Here we create schema/database into MongoDB where column is name, email and phone. Also it passes some parameters which is needs.
const contactSchema = mongoos.Schema({
    user_id: {
        type: mongoos.Schema.ObjectId,
        require: true,
        ref: "User"
    },
    name: {
        type: String,
        require: [true, "Please add contact Name"],
    },
    email: {
        type: String,
        require: [true, "Please add contact Email"],
    },
    phone: {
        type: String,
        require: [true, "Please add contact Number"],
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoos.model("Contact", contactSchema)