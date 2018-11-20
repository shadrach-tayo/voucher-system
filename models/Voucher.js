const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema definition for Voucher Object
const voucherSchema = new Schema({
  name: String,
  id: String,
  code: String,
  price: String
})

mongoose.model('vouchers', voucherSchema);