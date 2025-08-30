// Login User

import User from "../models/user.js";

export const userLogin = async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Generate a token or perform any other login logic
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register User

export const userRegister = async (req, res) => {
  const userData = req.body.data;
  const name = userData.username;
  const email = userData.email_addresses[0].email_address;
  const _id = userData.id;
  try {
    const existingUser = await User.findOne({ _id });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ name, email, _id });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
