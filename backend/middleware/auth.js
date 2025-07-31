const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Main authentication middleware
const protect = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

// Admin check
const admin = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') return res.status(403).json({ msg: 'Access denied' });
    next();
};

// Superadmin check
const superadmin = (req, res, next) => {
    if (req.user.role !== 'superadmin') return res.status(403).json({ msg: 'Access denied' });
    next();
};

module.exports = { protect, admin, superadmin }; 