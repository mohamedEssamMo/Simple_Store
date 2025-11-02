import Product from '../models/product.model.js';
import mongoose from 'mongoose';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({success: true, data: products});
  } catch (error) {
    res.status(500).json({success: false, message: 'Server Error'});
  }
}

export const createProduct = async (req, res) => {
  const product = req.body;
  
  if(!product.name || !product.price || !product.description || !product.image) {
    return res.status(400).json({success: false, message: 'All fields are required'});
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({success: true, data: newProduct});
  } catch (error) {
    res.status(500).json({success: false, message: 'Server Error'});
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if(!deletedProduct) {
      return res.status(404).json({success: false, message: 'Product not found'});
    }
    res.status(200).json({success: true, message: 'Product deleted successfully'});
  } catch (error) {
    res.status(500).json({success: false, message: 'Server Error'});
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  // ✅ Fix: use ObjectId with capital letters
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'No product with that id' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
