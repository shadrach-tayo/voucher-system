const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

// Define user schema
const userSchema = new Schema({
  _id: String,
  email: String,
  displayName: String,
  username: String,
  password: String,
  vouchers: [
    {
      amount: Number,
      id: Number,
      voucherId: String,
      name: String,
      imageurl: String
    }
  ],
  cart: [
    {
      id: Number,
      quantity: Number,
      item: {
        name: String,
        id: String,
        code: String,
        price: String,
        imageurl: String
      }
    }
  ]
});

mongoose.model("users", userSchema);
const User = mongoose.model("users");

userSchema.pre("save", function(next) {
  let user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});
