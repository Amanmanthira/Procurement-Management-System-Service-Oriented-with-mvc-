const mongoose = require('mongoose');
const quotationService = require('../Service/quotationService');
const QuoteRequest = mongoose.models.QuoteRequest || require('../models/QuoteRequest'); 
// Backend handling - saveQuoteRequest
const saveQuoteRequest = async (req, res) => {
  try {
    const { supplierId, products, date } = req.body;

    const newQuoteRequest = new QuoteRequest({
      supplierId,
      products,
      date, 
    });

    // Save the quote request to the database
    const savedQuoteRequest = await newQuoteRequest.save();

    // Send the response
    res.status(201).json({
      message: 'Quotation request saved successfully!',
      data: savedQuoteRequest,
    });
  } catch (error) {
    console.error('Error saving quote request:', error);
    res.status(500).json({ message: 'Failed to save quotation request' });
  }
};



// Fetch the quotation history
const getQuotationHistory = async (req, res) => {
  try {
    const history = await quotationService.getQuotationHistory();
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching quotation history:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get quotations for a specific supplier
const getQuotationsForSupplier = async (req, res) => {
  try {
    const supplierId = req.user._id;
    const quotations = await quotationService.getQuotationsForSupplier(supplierId);
    res.status(200).json(quotations);
  } catch (error) {
    console.error('Error fetching quotations for supplier:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update the status of a quotation
const updateQuotationStatus = async (req, res) => {
  try {
    const { quotationId, status } = req.body;
    const supplierId = req.user._id;
    const updatedQuotation = await quotationService.updateQuotationStatus(quotationId, status, supplierId);
    res.status(200).json({
      message: 'Quotation status updated successfully',
      data: updatedQuotation,
    });
  } catch (error) {
    console.error('Error updating quotation status:', error);
    res.status(500).json({ message: error.message });
  }
};

// Move quotation to accepted quotations collection
const moveToAcceptedQuotations = async (req, res) => {
  try {
    const { quotationId } = req.params;
    const message = await quotationService.moveToAcceptedQuotations(quotationId);
    res.status(200).json({ message });
  } catch (error) {
    console.error('Error moving quotation:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get accepted quotations for a specific supplier
const getAcceptedQuotationsForSupplier = async (req, res) => {
  try {
    const supplierId = req.user._id;
    const acceptedQuotations = await quotationService.getAcceptedQuotationsForSupplier(supplierId);
    res.status(200).json(acceptedQuotations);
  } catch (error) {
    console.error('Error fetching accepted quotations for supplier:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all accepted quotations for the admin
const getAllAcceptedQuotations = async (req, res) => {
  try {
    const acceptedQuotations = await quotationService.getAllAcceptedQuotations();
    res.status(200).json(acceptedQuotations);
  } catch (error) {
    console.error('Error fetching accepted quotations for admin:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await quotationService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: error.message });
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
