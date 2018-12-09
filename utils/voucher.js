const mongoose = require('mongoose');
const User = mongoose.model('users');

function deleteUserVoucher(user, id) {
  return new Promise((resolve, reject) => {
    user.vouchers = user.vouchers.filter(voucher => voucher.id !== Number(id));
    User.findByIdAndUpdate(user._id, user)
      .then(user => {
        console.log('updated user', user);
        resolve(user);
      })
      .catch(err => reject(err))
  })
};

function saveVouchers(vouchers) {
  return Promise.all(vouchers.map(voucher => {
    return new Voucher(voucher)
      .save()
      .then(voucher => voucher);
  }))
}

module.exports = {
  deleteUserVoucher, 
  saveVouchers
}