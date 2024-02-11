const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    avatar: { type: String, default: "" },
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

UserSchema.methods.generateJWT = async function () {
    return await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
}; 

UserSchema.methods.comparePassword = async function(enteredPassword){
 return await bcrypt.compare(enteredPassword, this.password);
}

const User = model('User', UserSchema);

module.exports = User;
