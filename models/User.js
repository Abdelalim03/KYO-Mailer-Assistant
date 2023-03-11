const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"You should enter your userName"],
    },
    email:{
        type:String,
        required:[true,"You should enter your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"You should enter your password"],
        select:false

    }
},{
    timeStamps:true
})



userSchema.pre(
    'save',
    async function(next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);
      
      this.password = hash;
      next();
    }
  );

//   userSchema.methods.isValidPassword = async function(password) {
//     const user = this;
//     console.log(password, user.password);

//     const compare = await bcrypt.compare(password, user.password);
  
//     return compare;
//   }


//   userSchema.method('isValidPassword',async function(password) {
//     const user = this;
//     console.log(password, user.password);
//     const compare = await bcrypt.compare(password, user.password);
  
//     return compare;
//   })

 module.exports= mongoose.model('User',userSchema);