const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { protect, admin } = require('../middleware/auth');

// Add property (admin only)
router.post('/', protect, admin, async (req, res) => {
    try {
        const property = new Property(req.body);
        await property.save();
        res.status(201).json(property);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
});

// Get properties
router.get('/', async (req, res) => {
    const properties = await Property.find();
    res.json(properties);
});

module.exports = router; 