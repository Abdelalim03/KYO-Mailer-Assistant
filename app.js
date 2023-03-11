const express  = require('express')
const cors = require('cors')
const chatRouter = require('./routes/chat');
const voiceRouter = require('./routes/voice');
const mailRouter = require('./routes/mail');


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(function (req, res, next) {
    res.header("Content-Type", 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

app.use('/chat', chatRouter)
app.use('/voice', voiceRouter)
app.use('/mail', mailRouter)



const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`KYO server started on http://localhost:${PORT}`))