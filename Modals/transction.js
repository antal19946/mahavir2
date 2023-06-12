const mongoose = require('mongoose')
// const validator = require('validator')


const transectionSchema = new mongoose.Schema({
    user_Id:{
        type:Number
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
    stake_order_Id:{
        type:Number,
        default:null
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
    level_distribution_status:{
        type:Number,
        default:0
    },
    amount:{
        type:Number
    },
    tx_charge:{
        type:Number,
        default:0
    },
    ben_per:{
        type:Number,
        default:null
    },
    time:{
        type:Date
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