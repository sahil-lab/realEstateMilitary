const mongoose = require('mongoose');
const propertySchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    location: String,
    image: String,
    partner: String
});
module.exports = mongoose.model('Property', propertySchema); 