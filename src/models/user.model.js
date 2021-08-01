const mongoose = require("mongoose");
const { RoleSchema } = require("@models/role.model");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: false
    },
    role: {
        type: RoleSchema,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const UserSchema =  userSchema;
const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    UserSchema
};