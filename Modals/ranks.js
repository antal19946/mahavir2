const mongoose = require('mongoose');

const rankSchema = new mongoose.Schema({
    user_Id:{
        type:Number
    },
    single_leg_rank:{
        type:Array,
        default:[]
    },
    royalty_rank:{
        type:Array,
        default:[]
    },
})
const Ranks = new mongoose.model('Ranks', rankSchema)
module.exports = Ranks;