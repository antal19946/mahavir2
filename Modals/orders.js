const mongoose = require('mongoose')
// const validator = require('validator')


const orderSchema = new mongoose.Schema({
    user_Id:{
        type:String
    },
    order_Id:{
        type:String
    },
    tx_type:{
        type:String
    },
    tx_hash:{
        type:String
    },
    package_name:{
        type:String
    },
    order_amount:{
        type:Number
    },
    time:{
        type:String
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