const express = require("express");
const mailController = require("../controllers/mail");


var router = express.Router();

router
.post('/',mailController);


module.exports = router;