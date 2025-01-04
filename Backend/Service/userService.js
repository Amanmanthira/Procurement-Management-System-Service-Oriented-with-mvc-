const User = require('../models/UserModel');

// Register a new user
const registerUser = async (name, email, password, role) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

// Get all users
const getUsers = async () => {
  return await User.find();
};

// Update user
const updateUser = async (id, name, email, role) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.role = role || user.role;

  await user.save();
  return user;
};

// Delete user
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = { registerUser, getUsers, updateUser, deleteUser };
