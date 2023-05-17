const mongoose = require('mongoose')
// const validator = require('validator')


const companyInfoSchema = new mongoose.Schema({
    currency:{
        type:String,
        default:'USD'
    },
    currency_sign:{
        type:String,
        default:'$'
    }
   
   
})
const company_info = new mongoose.model('company_info', companyInfoSchema)
module.exports = company_info;