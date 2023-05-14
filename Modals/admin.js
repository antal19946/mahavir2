const mongoose = require("mongoose");
// const validator = require('validator')

const adminSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    unique: false,
  },
  rights: {
    create_package:{
        title:{
            type:String,
            default:'Create Package'
        },
        status:{
            type:Number,
            default:1
        }
    },
    generate_pin:{
        title:{
            type:String,
            default:'Generate Pin'
        },
        status:{
            type:Number,
            default:1
        }
    },
    add_fund:{
        title:{
            type:String,
            default:'Add Fund'
        },
        status:{
            type:Number,
            default:1
        }
    },
  },
  created_on:{
    type:String,
  }
});
const adminData = new mongoose.model("adminData", adminSchema);
module.exports = adminData;
