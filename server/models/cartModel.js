import mongoose from 'mongoose';

const cartSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
     items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
      quantity: Number,
    }
  ],
    // createdAt: { type: Date, default: Date.now }
})


const cartModel = mongoose.model.cart || mongoose.model("cart", cartSchema)
export default cartModel;