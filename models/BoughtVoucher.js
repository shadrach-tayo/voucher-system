const mongoose = require('mongoose');
const { Schema } = mongoose;

const BoughtVoucherSchema = new Schema({
  userId: String,
  id: String,
  amount: Number,
  voucherId: String
})

mongoose.model('boughtvouchers', BoughtVoucherSchema);