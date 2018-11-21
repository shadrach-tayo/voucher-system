const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define user schema
const userSchema = new Schema({
  _id: String,
  googleId: String,
  email: String,
  imageUrl: String,
  displayName: String,
  vouchers: [{amount: Number, id: Number, voucherId: String, name: String}]
})

mongoose.model('users', userSchema);