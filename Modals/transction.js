const mongoose = require('mongoose')
// const validator = require('validator')


const transectionSchema = new mongoose.Schema({
    user_Id:{
        type:String
    },
    to_from:{
        type:String
    },
    tx_Id:{
        type:Number
    },
    order_Id:{
        type:Number
    },
    tx_type:{
        type:String
    },
    debit_credit:{
        type:String
    },
    source:{
        type:String
    },
    wallet_type:{
        type:String
    },
    level:{
        type:String,
        default:null
    },
    amount:{
        type:Number
    },
    ben_per:{
        type:Number,
        default:null
    },
    time:{
        type:String
    },
    status:{
        type:String
    },
    remark:{
        type:String
    },
    
})
const transection = new mongoose.model('transection', transectionSchema)
module.exports = transection;