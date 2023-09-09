const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

// Create a User
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // Create a new User
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exists");
  }
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  // Check if user exists
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      role: findUser?.role,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (err) {
    throw new Error(err);
  }
});

// Get a user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getUser = await User.findById(id);
    res.json(getUser);
  } catch (err) {
    throw new Error(err);
  }
});

// Delete a user
// const deleteUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deleteUser = await User.findById(id);
//     res.json(getUser);
//   } catch (err) {
//     throw new Error(err);
//   }
// });

module.exports = { createUser, loginUser, getAllUsers, getUser };
