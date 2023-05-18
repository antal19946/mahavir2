const mongoose = require('mongoose')
// const config = require('config')
const dbName = "mahavir"
const uri = `mongodb://0.0.0.0:27017/${dbName}`
mongoose.set("strictQuery", false);
mongoose.connect(uri,{
   
    useNewUrlParser:true
}).then(()=>{
    console.log('mongoose connected successfully')
}).catch((e)=>{
    console.log(e)
})
// mongodb+srv://eracom:eracom12345@cluster0.a5mjvlj.mongodb.net