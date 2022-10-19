const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
var dotenv = require("dotenv");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    birthdayDate: {
        type: String,
        require: true
    },
    emailAddress: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    Address: {
        type: String,
        require: true
    },
    pasword: {
        type: String,
        require: true
    },
    cpasword: {
        type: String,
        require: true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})

userSchema.pre('save', async function(next) {
    if (this.isModified('pasword')) {
        this.pasword = await bcrypt.hash(this.pasword, 12);
        this.cpasword = await bcrypt.hash(this.cpasword, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('USER', userSchema);
module.exports = User;