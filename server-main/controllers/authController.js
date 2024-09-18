const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    console.log('Received registration request:', req.body);

    const { name, email, password, role } = req.body;

    // Log the input details (omit the password for security reasons)
    console.log('Registering user with name:', name, 'and email:', email);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully.');

    // Create a new user object
    const user = new User({ name, email, password: hashedPassword, role });
    console.log('User object created:', user);

    // Save the user to the database
    await user.save();
    console.log('User saved to the database.');

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error.message);

    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '100h' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.createIndividualUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const password = "password" // Generate a random password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: 'individual' });
    await user.save();
    // In a real-world scenario, you'd want to send this password to the user securely
    res.status(201).json({ message: 'Individual user created successfully', user: { id: user._id, name: user.name, email: user.email, password: password } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create individual user' });
  }
};

exports.getIndividuals = async (req, res) => {
  try {
    const individuals = await User.find({ role: 'individual' }).select('name _id'); // Fetch only name and id
    res.status(200).json(individuals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
exports.getIssuers = async (req, res) => {
  try {
    const issuers = await User.find({ role: 'issuer' }).select('name _id'); // Fetch only name and id
    res.status(200).json(issuers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
exports.getVerifiers = async (req, res) => {
  try {
    const verifiers = await User.find({ role: 'verifier' }).select('name _id'); // Fetch only name and id
    res.status(200).json(verifiers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
