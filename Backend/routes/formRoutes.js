const express = require('express');
const router = express.Router();
const { submitForm, getForms } = require('../controllers/formController');

router.post('/', submitForm);
router.get('/', getForms);

module.exports = router;
