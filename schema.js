const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
  },
  customer_name: {
    type: String,
  },
  customer_email: {
    type: String,
  },
  customer_mobile_number: {
    type: Number,
  },
  method: {
    type: String,
  },
  amount: {
    type: Number,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  razorpay_token: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  user_id: {
    type: String,
  },
  payment_status: {
    type: String,
  },
});

module.exports = mongoose.model("Orders", orderSchema);
