import mongoose from 'mongoose';

const productShcema = new mongoose.Schema(
{
  name: { type: String, required: true},
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },

},
{
  timestamps: true,
});

const Product = mongoose.model('Product', productShcema);
export default Product;