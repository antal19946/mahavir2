const mongoose = require('mongoose')
// const validator = require('validator')


const companyInfoSchema = new mongoose.Schema({
    currency:{
        type:String,
        default:'Tron'
    },
    currency_sign:{
        type:String,
        default:'TRX'
    },
    deposit_address:{
        type:String,
        default:"TSswNyFTrY85zRiwebpf79CVt5tvH6ivbY"
    }
   
   
})
const company_info = new mongoose.model('company_info', companyInfoSchema)
module.exports = company_info;