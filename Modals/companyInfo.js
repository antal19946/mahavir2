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
        default:"TKwVjTkLucKkNUAt3wq8Ggss1orrLTioN1"
    }
   
   
})
const company_info = new mongoose.model('company_info', companyInfoSchema)
module.exports = company_info;