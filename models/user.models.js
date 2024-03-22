const mongoose = require('mongoose')


//Define the person Schema...
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   age: {
      type: Number,
      required: true,
   },
   email: {
      type: String,

   },
   mobile: {
      type: String
   },
   address: {
      type: String,
      required: true,
   },
   aadharCardNumber: {
      type: Number,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      enum: ['voter', 'admin'],
      default: 'voter'

   },
   isVoted: {
      type: Boolean,
      default: false
   }

});


const user = mongoose.model("User", userSchema);
module.exports = User;