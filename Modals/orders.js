const mongoose = require('mongoose')
// const validator = require('validator')


const orderSchema = new mongoose.Schema({
    user_Id:{
        type:Number
    },
    order_Id:{
        type:String
    },
    tx_type:{
        type:String
    },
    tx_hash:{
        type:String,
        default:null
    },
    package_name:{
        type:String
    },
    order_amount:{
        type:Number
    },
    time:{
        type:Date
    },
    status:{
        type:String
    },
    source:{
        type:String
    },
    remark:{
        type:String
    },
    
})
const order = new mongoose.model('order', orderSchema)
module.exports = order;