const mongoose = require('mongoose');
const QuoteRequest = mongoose.models.QuoteRequest || require('../models/QuoteRequest');
const User = require('../models/UserModel');
const Product = require('../models/Product');
const AcceptedQuotation = require('../models/AcceptedQuotations');

// Save a new quotation request
const saveQuoteRequest = async (supplierId, products, date) => {
  try {
    const newQuoteRequest = new QuoteRequest({
      supplierId,
      products,
      date,
    });

    const savedQuoteRequest = await newQuoteRequest.save();
    return savedQuoteRequest;
  } catch (error) {
    throw new Error('Failed to save quotation request');
  }
};

// Fetch the quotation history
const getQuotationHistory = async () => {
  try {
    const history = await QuoteRequest.find();

    return await Promise.all(
      history.map(async (quote) => {
        const supplier = await User.findById(quote.supplierId);
        const supplierName = supplier ? supplier.name : 'Unknown Supplier';

        const populatedProducts = await Promise.all(
          quote.products.map(async (product) => {
            const productDetails = await Product.findById(product.productId);
            return {
              ...product,
              productName: productDetails ? productDetails.name : 'Unknown Product',
              quantity: product.quantity || 0,
            };
          })
        );

        return {
          ...quote.toObject(),
          supplierName,
          products: populatedProducts,
        };
      })
    );
  } catch (error) {
    throw new Error('Error fetching quotation history');
  }
};

// Get quotations for a specific supplier
const getQuotationsForSupplier = async (supplierId) => {
  try {
    const quotations = await QuoteRequest.find({ supplierId })
      .populate('supplierId', 'name')
      .populate('products.productId', 'name');

    return await Promise.all(
      quotations.map(async (quote) => {
        const supplier = await User.findById(quote.supplierId);
        const supplierName = supplier ? supplier.name : 'Unknown Supplier';

        const populatedProducts = await Promise.all(
          quote.products.map(async (product) => {
            const productDetails = await Product.findById(product.productId);
            return {
              ...product,
              productName: productDetails ? productDetails.name : 'Unknown Product',
              quantity: product.quantity || 0,
            };
          })
        );

        return {
          ...quote.toObject(),
          supplierName,
          products: populatedProducts,
        };
      })
    );
  } catch (error) {
    throw new Error('Error fetching quotations for supplier');
  }
};

// Update the status of a quotation
const updateQuotationStatus = async (quotationId, status, supplierId) => {
  try {
    const quotation = await QuoteRequest.findById(quotationId);

    if (!quotation) {
      throw new Error('Quotation not found');
    }

    if (quotation.supplierId.toString() !== supplierId.toString()) {
      throw new Error('You are not authorized to update this quotation');
    }

    quotation.status = status;
    await quotation.save();

    return quotation;
  } catch (error) {
    throw new Error('Error updating quotation status');
  }
};

// Move quotation to accepted quotations collection
const moveToAcceptedQuotations = async (quotationId) => {
  try {
    const quotation = await QuoteRequest.findById(quotationId);

    if (!quotation) {
      throw new Error('Quotation not found');
    }

    const newAcceptedQuotation = new AcceptedQuotation({
      supplierId: quotation.supplierId,
      products: quotation.products,
      date: quotation.date,
      status: 'Accepted',
    });

    await newAcceptedQuotation.save();
    await quotation.deleteOne();

    return 'Quotation moved to accepted';
  } catch (error) {
    throw new Error('Error moving quotation to accepted');
  }
};

// Get accepted quotations for a specific supplier
const getAcceptedQuotationsForSupplier = async (supplierId) => {
  try {
    const acceptedQuotations = await AcceptedQuotation.find({ supplierId })
      .populate('supplierId', 'name')
      .populate('products.productId', 'name');

    return await Promise.all(
      acceptedQuotations.map(async (quote) => {
        const supplier = await User.findById(quote.supplierId);
        const supplierName = supplier ? supplier.name : 'Unknown Supplier';

        const populatedProducts = await Promise.all(
          quote.products.map(async (product) => {
            const productDetails = await Product.findById(product.productId);
            return {
              ...product,
              productName: productDetails ? productDetails.name : 'Unknown Product',
              quantity: product.quantity || 0,
            };
          })
        );

        return {
          ...quote.toObject(),
          supplierName,
          products: populatedProducts,
        };
      })
    );
  } catch (error) {
    throw new Error('Error fetching accepted quotations for supplier');
  }
};

// Get all accepted quotations for the admin
const getAllAcceptedQuotations = async () => {
  try {
    const acceptedQuotations = await AcceptedQuotation.find()
      .populate('supplierId', 'name')
      .populate('products.productId', 'name');

    return await Promise.all(
      acceptedQuotations.map(async (quote) => {
        const supplier = await User.findById(quote.supplierId);
        const supplierName = supplier ? supplier.name : 'Unknown Supplier';

        const populatedProducts = await Promise.all(
          quote.products.map(async (product) => {
            const productDetails = await Product.findById(product.productId);
            return {
              ...product,
              productName: productDetails ? productDetails.name : 'Unknown Product',
              quantity: product.quantity || 0,
            };
          })
        );

        return {
          ...quote.toObject(),
          supplierName,
          products: populatedProducts,
        };
      })
    );
  } catch (error) {
    throw new Error('Error fetching all accepted quotations for admin');
  }
};

// Get all users
const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

module.exports = {
  saveQuoteRequest,
  getQuotationHistory,
  getQuotationsForSupplier,
  updateQuotationStatus,
  moveToAcceptedQuotations,
  getAcceptedQuotationsForSupplier,
  getAllAcceptedQuotations,
  getUsers,
};
