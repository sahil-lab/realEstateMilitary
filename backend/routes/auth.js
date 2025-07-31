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
router.post('/adminRegister', protect, superadmin, async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ message: 'Admin email exists' });
        const admin = await User.create({ name, email, password, role: 'admin' });
        res.status(201).json({ token: sign(admin) });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Super Admin Login
router.post('/superAdminLogin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, role: 'superadmin' });
        if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
        res.json({ token: sign(user), role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Login
router.post('/adminLogin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, role: 'admin' });
        if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
        res.json({ token: sign(user), role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// General Login (for users)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
        res.json({ token: sign(user), role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all admins (superadmin only)
router.get('/admins', protect, superadmin, async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }).select('-password').sort('-createdAt');
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete admin (superadmin only)
router.delete('/admins/:id', protect, superadmin, async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        if (admin.role !== 'admin') return res.status(400).json({ message: 'User is not an admin' });

        await admin.deleteOne();
        res.json({ message: 'Admin removed successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user statistics (for dashboard)
router.get('/stats', protect, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const totalSuperAdmins = await User.countDocuments({ role: 'superadmin' });

        res.json({
            totalUsers,
            totalAdmins,
            totalSuperAdmins,
            totalAll: totalUsers + totalAdmins + totalSuperAdmins
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 