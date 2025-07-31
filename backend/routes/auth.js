const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Superadmin register
router.post('/superadmin/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User exists' });
        user = new User({ email, password, role: 'superadmin' });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Admin register (superadmin only)
router.post('/admin/register', auth, (req, res) => {
    if (req.user.role !== 'superadmin') return res.status(403).json({ msg: 'Unauthorized' });
    // Similar to superadmin register, set role: 'admin'
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, role: user.role });
});

module.exports = router; 