const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { USER_ROLE, USER_STATUS } = require('../utils/constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email address'],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    userRole: {
        type: String,
        required: true,
        enum: {
            values: [USER_ROLE.customer , USER_ROLE.admin , USER_ROLE.client],
            message: 'Invalid user role given'
        },
        default: USER_ROLE.customer
    },
    userStatus: {
        type: String,
        required: true,
        enum: {
            values: [USER_STATUS.approved , USER_STATUS.pending , USER_STATUS.rejected],
            message: 'Invalid status for user given'
        },
        default: USER_STATUS.approved
    },
}, {timestamps: true});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
});

/**
 * This is going to be an instance method for user, to compare a password with the stored encrypted password
 * @param  plainPassword -> input password given by user in sign in request
 * @returns boolean denoting whether passwords are same or not ?
 */

userSchema.methods.isValidPassword = async function (plainPassword)  {
    const currentUser = this;
    const compare = await bcrypt.compare(plainPassword, currentUser.password);
    return compare;
}


const User = mongoose.model('User', userSchema);

module.exports = User;