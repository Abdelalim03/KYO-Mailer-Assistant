const mongoose = require('mongoose');
exports.connectDb = async () => {
  try {
    const uri =(process.env.NODE_ENV==="development") ? process.env.MONGO_URI_DEV : process.env.MONGO_URI
    await mongoose.connect(uri)
    .then(db=>{
      console.log('Successfully Connected to the Database');
    })
  } catch (error) {
    console.log(error.message)
  }
}