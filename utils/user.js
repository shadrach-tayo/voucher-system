const mongoose = require("mongoose");
const User = mongoose.model("users");

/**
 * returns public user data
 * @param {object} user
 */
function safeUserInfo(user) {
  return {
    username: user.username,
    email: user.email,
    vouchers: user.vouchers
  };
}

/**
 * Save voucher object to a user's list of purchased vouchers
 * @param {Object} voucher
 */
function saveUserVoucher(user, voucher) {
  return new Promise((resolve, reject) => {
    user.vouchers.push(voucher);
    User.findByIdAndUpdate(user._id, user)
      .then(user => {
        resolve(user);
      })
      .catch(err => reject(err));
  });
}

/**
 * Adds cartItem to user's cart
 * @param {Object} user
 * @param {Object} cartItem
 */
function addToCart(user, cartItem) {
  return new Promise((res, rej) => {
    user.cart.push(cartItem);
    user
      .findByIdAndUpdate(user._id, user)
      .then(updateUser => res(user))
      .catch(err => rej(err));
  });
}

/**
 * check if user email exists in database
 * @param {String} email
 */
function checkUser(email) {
  return User.findOne({ email }).then(user => {
    if (user) {
      return user;
    }
    return false;
  });
}

module.exports = {
  checkUser,
  safeUserInfo,
  saveUserVoucher,
  addToCart
};
