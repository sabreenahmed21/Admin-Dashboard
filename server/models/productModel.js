import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: [true, 'Please tell us youre name'],
      min: 2,
      max: 100
    },
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  {
    timestamps: true,
  }
)
export default  mongoose.model('Product', productSchema);