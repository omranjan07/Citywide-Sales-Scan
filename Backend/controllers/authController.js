const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens

// Secret key for JWT (use a strong, random key in production)
const jwtSecret = 'supersecretjwtkey'; // CHANGE THIS IN PRODUCTION!

// Admin Registration
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if admin already exists
        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new admin
        admin = new Admin({
            username,
            password: hashedPassword,
        });

        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// Admin Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if admin exists
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare provided password with hashed password in DB
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            admin: {
                id: admin.id, // Mongoose model provides an 'id' getter for '_id'
                username: admin.username
            },
        };

        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ message: 'Login successful', token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
};
