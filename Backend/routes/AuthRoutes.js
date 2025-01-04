const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/AuthMiddleware');
const { register, login, getAllUsers, update, remove } = require('../controllers/AuthController');

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

// Route for getting all users (only accessible to admin users)
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

// Route for updating user details (only accessible to admin users)
router.put('/users/:id', authMiddleware, adminMiddleware, update);

// Route for deleting a user (only accessible to admin users)
router.delete('/users/:id', authMiddleware, adminMiddleware, remove);

module.exports = router;
