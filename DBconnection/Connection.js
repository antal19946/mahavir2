const mongoose = require('mongoose');
const user_data = require('../API/User/user');
// const config = require('config')
const dbName = "mahavir_test"
const uri = `mongodb+srv://ravik203305:ARVind123456@cluster0.rqsydxi.mongodb.net/${dbName}`
mongoose.set("strictQuery", false);
mongoose.connect(uri,{
   
    useNewUrlParser:true
}).then(()=>{
    console.log('mongoose connected successfully')
    user_data.getAdvance()
}).catch((e)=>{
    console.log(e)
})
// mongodb+srv://eracom:eracom12345@cluster0.a5mjvlj.mongodb.net