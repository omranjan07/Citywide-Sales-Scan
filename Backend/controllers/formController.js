const Form = require('../models/formModel');

exports.submitForm = async (req, res) => {
    try {
        const form = new Form(req.body);
        await form.save();
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting form', error });
    }
};

exports.getForms = async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving forms', error });
    }
};
