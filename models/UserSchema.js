const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },

    middleName:{
        type:String,
        trim:true
    },

    lastName:{
        type: String,
        required:true,
        trim: true,

    },

    userName:{
        type:String,
        required: true,
        trim:true,
        unique:true

    },

    email:{
        type:String,
        required: true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        unique:true,
    },

    profilePic:{
        type:String,
        default:'/images/profilePic.png'

    },
},{timestamps:true})//added timestamps to user data

var User = mongoose.model('User', UserSchema);

module.exports = User;