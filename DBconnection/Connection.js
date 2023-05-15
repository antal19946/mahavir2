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
