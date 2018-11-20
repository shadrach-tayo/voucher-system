const mongoose = require('mongoose');
const { Schema } = mongoose;
const BoughtVoucherschema = mongoose.model('boughtvouchers');

// Define user schema
const userSchema = new Schema({
  _id: String,
  googleId: String,
  email: String,
  imageUrl: String,
  displayName: String,
  vouchers: [BoughtVoucherschema]
})

mongoose.model('users', userSchema);