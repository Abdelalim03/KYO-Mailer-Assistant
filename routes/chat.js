const express = require("express");
const chatController = require("../controllers/chat");


var router = express.Router();

router
.post('/',chatController);


module.exports = router;