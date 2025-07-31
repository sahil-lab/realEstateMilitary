const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
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
module.exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') return res.status(403).json({ msg: 'Access denied' });
    next();
};

// Superadmin check
module.exports.isSuperAdmin = (req, res, next) => {
    if (req.user.role !== 'superadmin') return res.status(403).json({ msg: 'Access denied' });
    next();
}; 