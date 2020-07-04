//import mongoose, { Schema } from 'mongoose';
import dbpackage from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const {Schema} = dbpackage;

// create a user Schema
export const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'User name is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    emailid : {
        type : String,
        unique: true,
        required: [true, 'Email Address is required.']
    },
    telnum: {
        type: String,
        required: [true, 'Telephone number is required.']
    },
    address: {
        type: String
    },
    createdAt: Date,
    updatedAt: Date,
    other_data : [
        {
            type : Schema.Types.Mixed
        }
    ]
}, { versionKey: false });

/*
 * user schema middlewares
 */

// on every save, add the date
userSchema.pre('save', function (next) {
    // get the current date
    let currentDate = new Date();
    // change the updated_at field to current date
    this.updatedAt = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    next();
});

/*
 * user schema methods
 */
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    //For first time login we are not encrypting user password, until he will not reset it.
    //once user reset the password, we compare hash strings.
    return bcrypt.compareSync(password, this.password);
};

// we need to create a model using it
const User = dbpackage.model('User', userSchema);
export default User;