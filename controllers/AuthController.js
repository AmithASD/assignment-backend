import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateToken, generateRefreshToken } from '../utils/token.js';

// Register User
export const registerUser = async (req, res) => {
    const { email, password, userName } = req.body;

    if (!email || !password || !userName) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPass,
            userName,
            userRoles: ['USER'],
        });

        const savedUser = await newUser.save();

        const token = generateToken(savedUser._id, savedUser.email);
        return res.status(201).json({ user: savedUser, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id, user.email);
        return res.status(200).json({ userId: user._id, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Verify Token
export const handleTokenVerification = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const verified = jwt.verify(token, process.env.JWT_KEY);
        res.status(200).json({ success: true, verified });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// Get User Data
export const getUserData = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ data: user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
