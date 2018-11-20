const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema definition for User purchased Voucher
const BoughtVoucherSchema = new Schema({
  userId: String,
  id: String,
  amount: Number,
  voucherId: String
})

mongoose.model('boughtvouchers', BoughtVoucherSchema);