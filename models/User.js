const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: String,
  googleId: String,
  email: String,
  imageUrl: String,
  displayName: String
})

mongoose.model('users', userSchema);