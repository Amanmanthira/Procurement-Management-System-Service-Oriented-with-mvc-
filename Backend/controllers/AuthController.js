const { registerUser } = require('../Service/userService');
const { loginUser } = require('../Service/authService');
const { getUsers, updateUser, deleteUser } = require('../Service/userService');

// Controller function for registering a user
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await registerUser(name, email, password, role);
    const token = await loginUser(user.email, password); // assuming loginUser returns an object with a token
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function for logging in a user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, role } = await loginUser(email, password);
    res.status(200).json({
      message: 'Login successful',
      token,
      role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function for getting all users
const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for updating a user
const update = async (req, res) => {
  const { name, email, role } = req.body;
  const { id } = req.params;
  try {
    const updatedUser = await updateUser(id, name, email, role);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function for deleting a user
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getAllUsers, update, remove };
