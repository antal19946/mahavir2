const mongoose = require('mongoose')
// const validator = require('validator')


const E_pinSchema = new mongoose.Schema({
    transfer_by: {
        type: String,
        default:null
    },
    pin:{
        type: String,
        required:true
    },
    user_Id:{
        type: Number,
        required:true
    },
    use_for_user_Id:{
        type: String,
        default:null
    },
    created_by:{
        type: String,
        required:true
    },
    status:{
        type: Number,
        default:1
    },
    used_in:{
        type: String,
        default:null
    },
    is_used:{
        type: Number,
        default:0
    },
    remark:{
        type: String,
        default:null
    },
    pin_type:{
        type: String,
    },
    retrieve_status:{
        type: Number,
        default:0
    },
    created_on:{
        type: Date,
    },
    updated_on:{
        type: Date,
        default:null
    }
    
  
})
const EpinData = new mongoose.model('Epin', E_pinSchema)
module.exports = EpinData