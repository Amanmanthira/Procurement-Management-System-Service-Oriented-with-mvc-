const Product = require('../models/Product');

// Get products based on the user's role
const getProducts = async (user) => {
  if (user.role === 'admin') {
    return await Product.find().populate('supplier', 'name');
  } else {
    return await Product.find({ supplier: user._id }).populate('supplier', 'name');
  }
};

// Add a product (only suppliers can add their products)
const addProduct = async (user, productData) => {
  if (user.role !== 'supplier') {
    throw new Error('You are not authorized to add products');
  }

  const { name, price, inventory, minimumStockLevel } = productData;

  if (!name || !price || !inventory || !minimumStockLevel) {
    throw new Error('All fields (name, price, inventory, minimumStockLevel) are required');
  }

  const newProduct = await Product.create({
    name,
    price,
    inventory,
    minimumStockLevel,
    supplier: user._id,
  });

  return newProduct;
};

// Update a product (only the supplier can update their own products)
const updateProduct = async (user, productId, productData) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.supplier.toString() !== user._id.toString()) {
    throw new Error('You can only edit your own products');
  }

  product.name = productData.name || product.name;
  product.price = productData.price || product.price;
  product.inventory = productData.inventory || product.inventory;
  product.minimumStockLevel = productData.minimumStockLevel || product.minimumStockLevel;

  const updatedProduct = await product.save();
  return updatedProduct;
};

// Delete a product (only the supplier can delete their own products)
const deleteProduct = async (user, productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.supplier.toString() !== user._id.toString()) {
    throw new Error('You can only delete your own products');
  }

  await Product.deleteOne({ _id: productId });
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
