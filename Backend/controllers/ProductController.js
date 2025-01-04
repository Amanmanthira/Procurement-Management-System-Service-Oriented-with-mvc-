const { getProducts, addProduct, updateProduct, deleteProduct } = require('../Service/productService');

// Get products based on the user's role
const getProductsController = async (req, res) => {
  try {
    const products = await getProducts(req.user);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a product (only suppliers can add their products)
const addProductController = async (req, res) => {
  try {
    const newProduct = await addProduct(req.user, req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product (only the supplier can update their own products)
const updateProductController = async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.user, req.params.id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product (only the supplier can delete their own products)
const deleteProductController = async (req, res) => {
  try {
    await deleteProduct(req.user, req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProductsController,
  addProductController,
  updateProductController,
  deleteProductController,
};
