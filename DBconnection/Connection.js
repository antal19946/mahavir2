const mongoose = require('mongoose');
const user_data = require('../API/User/user');
// const config = require('config')
const dbName = "tron300"
const uri = `mongodb://127.0.0.1:27017/${dbName}`
mongoose.set("strictQuery", false);
mongoose.connect(uri,{
   
    useNewUrlParser:true
}).then(()=>{
    console.log('mongoose connected successfully')
    user_data.getAdvance()
}).catch((e)=>{
    console.log(e)
})
// mongodb+srv://ravik203305:ARVind123456@cluster0.rqsydxi.mongodb.net