import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaShoppingCart, FaSmile, FaHome, FaStar, FaPaperPlane, FaCopyright } from 'react-icons/fa';
import { GiShoppingBag, GiRiceCooker, GiToothbrush, GiSoap, GiTeapot, GiOilDrum } from 'react-icons/gi';

function Home() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        mobileno: '',
        city: '',
        pincode: '',
        state: '',
        country: '',
        useReason: '',
        preferences: {
            detergent: { brand: '', priceRange: '' },
            rice: { brand: '', priceRange: '' },
            toothpaste: { brand: '', priceRange: '' },
            soap: { brand: '', priceRange: '' },
            tea: { brand: '', priceRange: '' },
            oil: { brand: '', priceRange: '' },
        }
    });
    const [adminLogin, setAdminLogin] = useState({ username: '', password: '' });
    const [activeSection, setActiveSection] = useState('survey');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('preferences.')) {
            const [_, category, field] = name.split('.');
            setFormData(prev => ({
                ...prev,
                preferences: {
                    ...prev.preferences,
                    [category]: {
                        ...prev.preferences[category],
                        [field]: value
                    }
                }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/form', formData);
            alert('Form submitted successfully! Thank you for your time.');
            // Reset form after submission
            setFormData({
                name: '',
                age: '',
                mobileno: '',
                city: '',
                pincode: '',
                state: '',
                country: '',
                useReason: '',
                preferences: {
                    detergent: { brand: '', priceRange: '' },
                    rice: { brand: '', priceRange: '' },
                    toothpaste: { brand: '', priceRange: '' },
                    soap: { brand: '', priceRange: '' },
                    tea: { brand: '', priceRange: '' },
                    oil: { brand: '', priceRange: '' },
                }
            });
        } catch (error) {
            alert('There was an error submitting your form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAdminLogin = async () => {
        setLoginError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', adminLogin);
            if (res.status === 200) {
                navigate('/admin');
            }
        } catch (error) {
            setLoginError('Invalid credentials. Please try again.');
        }
    };

    const preferenceFields = [
        { key: 'detergent', icon: <GiShoppingBag className="text-blue-700" />, label: "Detergent" },
        { key: 'rice', icon: <GiRiceCooker className="text-amber-700" />, label: "Rice" },
        { key: 'toothpaste', icon: <GiToothbrush className="text-teal-700" />, label: "Toothpaste" },
        { key: 'soap', icon: <GiSoap className="text-pink-700" />, label: "Soap" },
        { key: 'tea', icon: <GiTeapot className="text-red-700" />, label: "Tea" },
        { key: 'oil', icon: <GiOilDrum className="text-yellow-700" />, label: "Oil" },
    ];
    
    const brands = {
        detergent: ['Surf Excel', 'Tide', 'Ariel', 'Ghadi'],
        rice: ['India Gate', 'Daawat', 'Kohinoor', 'Fortune'],
        toothpaste: ['Colgate', 'Pepsodent', 'Sensodyne', 'Patanjali'],
        soap: ['Lux', 'Lifebuoy', 'Dove', 'Pears'],
        tea: ['Tata Tea', 'Red Label', 'Taj Mahal', 'Wagh Bakri'],
        oil: ['Fortune', 'Saffola', 'Dhara', 'Emami'],
    };
    
    const prices = ['Under ₹50', '₹50–₹100', '₹100+'];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    // Floating shapes background component
    const FloatingShapes = () => (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        rotate: Math.random() * 360,
                        scale: 0.5 + Math.random()
                    }}
                    animate={{
                        x: [null, Math.random() * 100],
                        y: [null, Math.random() * 100],
                        rotate: [null, Math.random() * 360],
                        transition: {
                            duration: 20 + Math.random() * 20,
                            repeat: Infinity,
                            repeatType: 'reverse'
                        }
                    }}
                    className={`absolute rounded-full opacity-20 ${[
                        'bg-blue-600',
                        'bg-purple-600',
                        'bg-pink-600',
                        'bg-teal-600',
                        'bg-yellow-500',
                        'bg-red-500'
                    ][i % 6]}`}
                    style={{
                        width: `${20 + Math.random() * 40}px`,
                        height: `${20 + Math.random() * 40}px`,
                    }}
                />
            ))}
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4 md:p-8 relative overflow-hidden">
            <FloatingShapes />
            
            {/* Header Section */}
            <header className="relative w-full max-w-6xl mx-auto flex justify-between items-center z-20 mb-8 md:mb-12">
                <div className="flex flex-col items-start md:items-center flex-grow">
                    <motion.div
                        animate={{ 
                            y: [0, -15, 0],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 4,
                            ease: "easeInOut"
                        }}
                        className="relative hidden md:block"
                        aria-hidden="true"
                    >
                        <div className="w-28 h-28 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full relative shadow-lg flex items-center justify-center">
                            <div className="absolute top-8 left-8 w-5 h-5 bg-white rounded-full shadow-inner"></div>
                            <div className="absolute top-8 right-8 w-5 h-5 bg-white rounded-full shadow-inner"></div>
                            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-white rounded-full shadow-inner"></div>
                            <FaSmile className="text-4xl text-pink-700 absolute bottom-8 left-1/2 transform -translate-x-1/2" />
                        </div>
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-4 border-4 border-dashed border-pink-400 rounded-full"
                        ></motion.div>
                    </motion.div>
                    <motion.h1 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 tracking-wide text-center mt-4 md:mt-6"
                    >
                        Consumer Survey
                    </motion.h1>
                    <p className="text-lg text-purple-800 mt-2 font-medium text-center">
                        Help us understand your preferences!
                    </p>
                </div>

                {/* Admin Login Button (Desktop) */}
                <button
                    onClick={() => setActiveSection('admin')}
                    className={`hidden md:flex px-6 py-3 font-bold rounded-full items-center justify-center transition-all shadow-md text-base 
                        ${activeSection === 'admin' 
                            ? 'bg-gradient-to-r from-green-600 to-teal-700 text-white' 
                            : 'bg-white text-gray-700 hover:text-teal-700 hover:shadow-lg border border-gray-200'
                        }`}
                    aria-label="Admin login"
                >
                    <FaLock className="mr-2" />
                    Admin Login
                </button>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl w-full mx-auto relative z-10 flex-grow flex items-center justify-center">
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-full"
                >
                    {/* Mobile Navigation Tabs */}
                    <div className="flex mb-8 bg-white rounded-full p-1 shadow-lg max-w-sm mx-auto md:hidden border border-gray-200">
                        <button
                            onClick={() => setActiveSection('survey')}
                            className={`px-4 py-2 font-bold rounded-full flex-1 flex items-center justify-center transition-all text-sm ${
                                activeSection === 'survey' 
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-md' 
                                    : 'text-gray-700 hover:text-purple-700'
                            }`}
                            aria-current={activeSection === 'survey' ? 'page' : undefined}
                        >
                            <FaShoppingCart className="mr-1" />
                            Survey
                        </button>
                        <button
                            onClick={() => setActiveSection('admin')}
                            className={`px-4 py-2 font-bold rounded-full flex-1 flex items-center justify-center transition-all text-sm ${
                                activeSection === 'admin' 
                                    ? 'bg-gradient-to-r from-green-600 to-teal-700 text-white shadow-md' 
                                    : 'text-gray-700 hover:text-teal-700'
                            }`}
                            aria-current={activeSection === 'admin' ? 'page' : undefined}
                        >
                            <FaLock className="mr-1" />
                            Admin
                        </button>
                    </div>

                    {/* Survey Form */}
                    {activeSection === 'survey' && (
                        <motion.form 
                            onSubmit={handleSubmit} 
                            className="grid gap-6 bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-2xl mx-auto"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            aria-labelledby="survey-heading"
                        >
                            <motion.h2 
                                variants={itemVariants} 
                                id="survey-heading"
                                className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent flex items-center"
                            >
                                <FaUser className="mr-2 md:mr-3 text-pink-600" aria-hidden="true" /> 
                                Personal Information
                            </motion.h2>
                            
                            {['name', 'age', 'mobileno'].map(field => (
                                <motion.div key={field} variants={itemVariants} className="relative">
                                    <label htmlFor={field} className="sr-only">
                                        {field.charAt(0).toUpperCase() + field.slice(1).replace('no', ' No.')}
                                    </label>
                                    <input
                                        id={field}
                                        type={field === 'age' || field === 'mobileno' ? 'number' : 'text'}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace('no', ' No.')}
                                        className="w-full p-3 md:p-4 border-2 border-purple-200 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition-all text-gray-800 font-medium placeholder-purple-400 bg-white"
                                        required
                                        aria-required="true"
                                    />
                                    {field === 'age' && (
                                        <motion.div 
                                            animate={{ 
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 10, -10, 0],
                                                backgroundColor: ['#d97706', '#f59e0b', '#fbbf24']
                                            }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-amber-600 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg font-bold text-sm md:text-base"
                                            aria-hidden="true"
                                        >
                                            {formData.age || '?'}
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}

                            <motion.h2 
                                variants={itemVariants} 
                                className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-green-700 to-teal-700 bg-clip-text text-transparent flex items-center mt-4 md:mt-8"
                            >
                                <FaHome className="mr-2 md:mr-3 text-blue-600" aria-hidden="true" /> 
                                Address Information
                            </motion.h2>
                            
                            {['city', 'pincode', 'state', 'country'].map(field => (
                                <motion.div key={field} variants={itemVariants}>
                                    <label htmlFor={field} className="sr-only">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        id={field}
                                        type={field === 'pincode' ? 'number' : 'text'}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                        className="w-full p-3 md:p-4 border-2 border-teal-200 rounded-xl focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all text-gray-800 font-medium placeholder-teal-400 bg-white"
                                        required
                                        aria-required="true"
                                    />
                                </motion.div>
                            ))}

                            <motion.h2 
                                variants={itemVariants} 
                                className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-700 to-red-700 bg-clip-text text-transparent flex items-center mt-4 md:mt-8"
                            >
                                <GiShoppingBag className="mr-2 md:mr-3 text-yellow-600" aria-hidden="true" /> 
                                Product Preferences
                            </motion.h2>
                            
                            {preferenceFields.map(({key, icon, label}) => (
                                <motion.div 
                                    key={key} 
                                    variants={itemVariants} 
                                    className="grid md:grid-cols-2 gap-4 bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-2xl border border-purple-100"
                                >
                                    <div className="flex items-center space-x-2 md:space-x-3">
                                        <motion.div 
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                            className="text-xl md:text-2xl"
                                            aria-hidden="true"
                                        >
                                            {icon}
                                        </motion.div>
                                        <div className="flex-1">
                                            <label htmlFor={`${key}-brand`} className="sr-only">
                                                {label} brand
                                            </label>
                                            <select
                                                id={`${key}-brand`}
                                                name={`preferences.${key}.brand`}
                                                value={formData.preferences[key].brand}
                                                onChange={handleChange}
                                                className="w-full p-3 md:p-4 border-2 border-purple-200 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition-all text-gray-800 font-medium appearance-none bg-white"
                                                required
                                                aria-required="true"
                                            >
                                                <option value="" disabled hidden>Select {key} brand</option>
                                                {brands[key].map((b, i) => (
                                                    <option key={i} value={b}>{b}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor={`${key}-price`} className="sr-only">
                                            {label} price range
                                        </label>
                                        <select
                                            id={`${key}-price`}
                                            name={`preferences.${key}.priceRange`}
                                            value={formData.preferences[key].priceRange}
                                            onChange={handleChange}
                                            className="w-full p-3 md:p-4 border-2 border-blue-200 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 font-medium appearance-none bg-white"
                                            required
                                            aria-required="true"
                                        >
                                            <option value="" disabled hidden>Select price range</option>
                                            {prices.map((p, i) => (
                                                <option key={i} value={p}>{p}</option>
                                            ))}
                                        </select>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div variants={itemVariants} className="mt-4 md:mt-6">
                                <label 
                                    htmlFor="useReason" 
                                    className="block text-xl font-bold text-purple-800 mb-2 md:mb-3 flex items-center"
                                >
                                    <FaStar className="mr-2 text-yellow-500" aria-hidden="true" /> 
                                    Why do you prefer these products?
                                </label>
                                <textarea
                                    id="useReason"
                                    name="useReason"
                                    value={formData.useReason}
                                    onChange={handleChange}
                                    placeholder="Tell us your reasons..."
                                    rows="4"
                                    className="w-full p-3 md:p-4 border-2 border-pink-200 rounded-xl focus:border-pink-600 focus:ring-4 focus:ring-pink-100 transition-all text-gray-800 font-medium placeholder-pink-400 resize-y bg-white"
                                    required
                                    aria-required="true"
                                />
                            </motion.div>

                            <motion.button 
                                type="submit" 
                                variants={itemVariants}
                                whileHover={{ 
                                    scale: 1.03,
                                    boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-4 md:p-5 rounded-xl font-extrabold text-lg md:text-xl shadow-xl hover:shadow-2xl transition-all mt-4 md:mt-8 flex items-center justify-center space-x-2 md:space-x-3"
                                disabled={isSubmitting}
                                aria-busy={isSubmitting}
                            >
                                <span>{isSubmitting ? 'Submitting...' : 'Submit Survey'}</span>
                                {!isSubmitting && (
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        aria-hidden="true"
                                    >
                                        <FaPaperPlane />
                                    </motion.div>
                                )}
                            </motion.button>
                        </motion.form>
                    )}

                    {/* Admin Login Form - ENHANCED COLORS */}
                    {activeSection === 'admin' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            // Changed background to a subtle dark gradient, deeper shadow, stronger border
                            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-3xl shadow-2xl shadow-gray-700/50 border border-gray-700 max-w-md mx-auto"
                            aria-labelledby="admin-heading"
                        >
                            <h2 
                                id="admin-heading"
                                // Changed heading gradient for a more serious/secure feel
                                className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 md:mb-8 flex items-center"
                            >
                                <FaLock className="mr-2 md:mr-3 text-yellow-300" aria-hidden="true" /> 
                                Admin Portal
                            </h2>
                            
                            <div className="space-y-6">
                                {loginError && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-200 border-l-4 border-red-700 text-red-800 p-4 rounded" // Slightly softer error
                                        role="alert"
                                    >
                                        <p>{loginError}</p>
                                    </motion.div>
                                )}
                                
                                <div className="relative">
                                    <label htmlFor="username" className="sr-only">Username</label>
                                    <input
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        value={adminLogin.username}
                                        onChange={e => setAdminLogin({ ...adminLogin, username: e.target.value })}
                                        // Input field: darker background, lighter text, focus ring
                                        className="w-full p-3 md:p-4 border-2 border-gray-600 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 transition-all pl-12 md:pl-14 text-white font-medium placeholder-gray-400 bg-gray-700"
                                        required
                                        aria-required="true"
                                    />
                                    {/* Icon background changed to match focus color for visual consistency */}
                                    <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white text-base md:text-xl">
                                        <FaUser aria-hidden="true" />
                                    </div>
                                </div>
                                
                                <div className="relative">
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={adminLogin.password}
                                        onChange={e => setAdminLogin({ ...adminLogin, password: e.target.value })}
                                        // Input field: darker background, lighter text, focus ring
                                        className="w-full p-3 md:p-4 border-2 border-gray-600 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all pl-12 md:pl-14 text-white font-medium placeholder-gray-400 bg-gray-700"
                                        required
                                        aria-required="true"
                                    />
                                    {/* Icon background changed to match focus color for visual consistency */}
                                    <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white text-base md:text-xl">
                                        <FaLock aria-hidden="true" />
                                    </div>
                                </div>
                                
                                <motion.button 
                                    onClick={handleAdminLogin}
                                    whileHover={{ 
                                        scale: 1.03,
                                        boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                    // Login button: new gradient for a stronger call to action
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 md:p-5 rounded-xl font-extrabold text-lg md:text-xl shadow-xl hover:shadow-2xl transition-all mt-6 md:mt-8 flex items-center justify-center space-x-2 md:space-x-3"
                                >
                                    <span>Login to Dashboard</span>
                                    <motion.div
                                        animate={{ rotate: [0, 20, -20, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        aria-hidden="true"
                                    >
                                        <FaLock />
                                    </motion.div>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </main>

            {/* Footer Section */}
            <motion.footer 
                className="mt-8 md:mt-12 text-center py-4 relative z-10 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <p className="text-purple-800 font-medium mb-3">
                    Thank you for participating in our survey!
                </p>
                <div className="flex justify-center mt-3 space-x-4 md:space-x-6">
                    {[1, 2, 3, 4, 5].map(i => (
                        <motion.div
                            key={i}
                            animate={{ 
                                y: [0, -10, 0],
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                                duration: 3 + i * 0.5, 
                                repeat: Infinity,
                                repeatType: 'reverse'
                            }}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-lg md:text-xl shadow-md ${
                                [
                                    'bg-pink-600',
                                    'bg-yellow-500',
                                    'bg-blue-600',
                                    'bg-green-600',
                                    'bg-purple-600'
                                ][i % 5]
                            }`}
                            aria-hidden="true"
                        >
                            {['🌟', '🎉', '❤️', '👍', '✨'][i % 5]}
                        </motion.div>
                    ))}
                </div>
                <p className="mt-6 text-sm md:text-base font-semibold text-purple-900 flex items-center justify-center">
                    <FaCopyright className="mr-2" aria-hidden="true" /> 
                    2025 Om Ranjan. All rights reserved.
                </p>
            </motion.footer>
        </div>
    );
}

export default Home;