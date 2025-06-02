const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    priceRange: { type: String, required: true }
});

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    mobileno: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    preferences: {
        detergent: { type: preferenceSchema, required: true },
        rice: { type: preferenceSchema, required: true },
        toothpaste: { type: preferenceSchema, required: true },
        soap: { type: preferenceSchema, required: true },
        tea: { type: preferenceSchema, required: true },
        oil: { type: preferenceSchema, required: true },
    },
    useReason: { type: String, required: true }
});

module.exports = mongoose.model('Form', formSchema);
