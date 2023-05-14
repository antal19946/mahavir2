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
        type:String
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
    amount:{
        type:Number
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