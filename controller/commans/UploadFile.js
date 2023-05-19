const express = require('express');
const multer = require('multer');
// const path = require('path');

// const app = express();

// configure storage options for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // set the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // keep the original file name
  }
});

// create an instance of the multer middleware with the configured storage options
const upload = multer({ storage: storage });




module.exports = upload