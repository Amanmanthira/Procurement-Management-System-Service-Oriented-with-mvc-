const express = require('express');
const {
  getProductsController,
  addProductController,
  updateProductController,
  deleteProductController,
} = require('../controllers/ProductController');
const { authMiddleware, adminMiddleware } = require('../middleware/AuthMiddleware');

const router = express.Router();

// Product Routes
router.get('/products', authMiddleware, getProductsController);
router.post('/products', authMiddleware, addProductController);
router.put('/products/:id', authMiddleware, updateProductController);
router.delete('/products/:id', authMiddleware,  deleteProductController); // Admin only



module.exports = router;
