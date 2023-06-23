const mongoose = require("mongoose");
// const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  mobile: {
    type: String,
    unique: false,
  },
  password: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    default: 0,
  },
  user_Id: {
    type: Number,
    unique: true,
  },
  user_name: {
    type: String,
    unique: false,
  },
  sponsor_Id: {
    type: Number,
    required:true
  },
  sponsor_Name:{
    type: String,
  },
  joining_date: {
    type: Date,
    
  },
  Activation_date: {
    type: Date,
    default: null,
  },
  profile_pic: {
    type: String,
    default: null,
  },
});
const UserData = new mongoose.model("UserData", userSchema);
module.exports = UserData;
