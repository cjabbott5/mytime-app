import User from '../models/user.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // check if user already exists
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // create new user
  const user = await User.create({ email, password });

  // send response with token
  res.status(201).json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};
