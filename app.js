const express = require('express')
require('./DBconnection/Connection')
const app = express()
const router = require('./Routes/index')
app.use(express.urlencoded({extended: false}))
const port = 3000;
app.use(express.static(__dirname + '/uploads/'))
app.use(router)
var bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(express.json())
app.listen(port, () => console.log(`Example app listening on port ${port}!`))