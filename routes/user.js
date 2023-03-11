var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require("../models/User");
/* GET users listing. */
router
  .get('/',function (req, res, next) {
    res.send("respond with a resource");
  })

  .post("/login", async function (req, res, next) {
    const { email, password } = req.body;
      try {
        let user=await User.findOne({email}).select('+password');
        if (user){
          const compare = await bcrypt.compare(password, user.password);
          
          if (!compare) {
            return res.status(404).json({success:false,message:"Invalid User or Password"});
          }
          const token = jwt.sign(
            { userId: user.id},
            process.env.SECRET_KEY,
            { expiresIn: "7d" });
            user =await User.findById(user.id).select('-password')
              res.status(200).json({success:true,user:user,token:token,message:"Logged in Successfully"});

          
        }else{
          res.status(404).json({success:false,message:"Invalid User or Password"})
        }
      } catch (error) {
        res.status(500).json(error);
      }
    }
  )
  .post("/signup", function (req, res, next) {
    const { username,email, password } =
      req.body;
      User.findOne({email:email}).then(user=>{
        if (user){
          res.status(400).json({success:false,message:"Email already exists"})
        }else{
          const user = User({
            username,email, password
          });
    
          user.save().then(user=>{
            const token = jwt.sign(
              { userId: username.id },
              process.env.SECRET_KEY,
              { expiresIn: "7d" }
            );
            User.findById(user.id).select('-password')
                .then(user=>{
                  res.status(200).json({success:true,user:user,token:token,message:"Register Successfully"});
                })
            
            
          }).catch(err=>res.status(500).json(err));
        }
      });
      
      
  });


module.exports = router;
