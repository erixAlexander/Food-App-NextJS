import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  userId: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  items: [
    new Schema(
      {
        itemId: String,
        productId: String,
        productName: String,
        quantity: Number,
        size: String,
        extras: [new Schema({ ing: String, price: Number }, { _id: false })],
        price: Number,
        total: Number,
      },
      { _id: false }
    ),
  ],
  total: { type: Number },
  option: { type: String },
  address: { type: String },
});

const Orders = mongoose.models.Orders || mongoose.model("Orders", orderSchema);

export default Orders;
