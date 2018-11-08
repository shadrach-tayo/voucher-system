const mongoose = require('mongoose');
const { Schema } = mongoose;

const voucherSchema = new Schema({
  name: String,
  id: String,
  code: String,
  price: String
})

mongoose.model('vouchers', voucherSchema);