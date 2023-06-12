const mongoose = require('mongoose')
// const validator = require('validator')


const stakeSchema = new mongoose.Schema({
    user_Id:{
        type:Number
    },
    stake_Id:{
        type:Number
    },
    tx_type:{
        type:String
    },
    tx_hash:{
        type:String,
        default:null
    },
    stake_for_days:{
        type:Number
    },
    staking_amount:{
        type:Number
    },
    stake_time_start:{
        type:Date
    },
    stake_time_end:{
        type:Date
    },
    status:{
        type:Number
    },
    source:{
        type:String,
        default:null
    },
    remark:{
        type:String,
        default:null
    },
    
})
const stakeOrders = new mongoose.model('stakeOrders', stakeSchema)
module.exports = stakeOrders;