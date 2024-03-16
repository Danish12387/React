import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwtSecret from "../config/jwt.mjs";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    fullName: {
        type: String,
        required: true
    },
    tokens: {
        default: [],
        type: []
    }
});

userSchema.pre('save', function (next) {
    const user = this;
    //encryption
    if (user.isModified('password')) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);

        user.password = hash;
    }
    next();
});

userSchema.methods.comparePassword = function (password) {
    const user = this;

    return bcrypt.compareSync(password, user.password);
}

userSchema.methods.generateToken = function () {
    const { _id } = this;
    const token = jwt.sign({ _id }, jwtSecret);

    return token;
}

const Users = mongoose.model('users', userSchema);

export default Users;