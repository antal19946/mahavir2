const express = require('express')
const os = require('os');
const localtunnel = require('localtunnel');
const hostname = os.hostname();
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
console.log('Current working directory:', process.cwd());
console.log('Directory of the current script:', __dirname);
app.listen(3000, () => {
  console.log('Server is running on port 3000');

  localtunnel(3000, (err, tunnel) => {
    if (err) {
      console.error('Error creating local tunnel:', err);
      return;
    }

    console.log('Full URL:', tunnel.url);
  });
});
