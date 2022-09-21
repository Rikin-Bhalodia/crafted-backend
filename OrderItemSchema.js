const mongoose = require("mongoose");

const orderDataSchema = new mongoose.Schema({
  order_id: {
    type: String,
  },
  productDetails: [
    {
      category: { type: String },
      color: [{ type: String }],
      id: { type: Number },
      mrp: { type: String },
      name: { type: String },
      sale_price: { type: String },
      size: { type: String },
      sku: { type: String },
      tag: { type: String },
      totalUserItem: { type: Number },
    },
  ],
  user_id: {
    type: String,
  },
});

module.exports = mongoose.model("OrderData", orderDataSchema);
