import jwt from 'jsonwebtoken';

export const generateToken = (userId, email) => {
    return jwt.sign({ userId, email }, process.env.JWT_KEY, { expiresIn: '1h' });
};

export const generateRefreshToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '7d' });
};
