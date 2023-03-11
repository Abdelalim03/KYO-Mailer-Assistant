const express = require("express");
const multer = require('multer');
const voiceController = require("../controllers/voice");


const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   });

const upload = multer({ storage: storage });

var router = express.Router();

router
.post('/',upload.single('audio'),voiceController);


module.exports = router;