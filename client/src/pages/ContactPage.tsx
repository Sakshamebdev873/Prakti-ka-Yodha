import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaPhone, FaChevronDown } from 'react-icons/fa';

// --- Data for FAQ Section ---


// --- Main Contact Page Component ---
const ContactPage: React.FC = () => {
 

    return (
        <section className="py-20 mt-7 bg-gray-50">
            <div className="container mx-auto px-6">
                {/* 1. Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Have a question, a suggestion, or want to partner with us? Our team is ready to help.
                    </p>
                </motion.div>

                {/* 2. Main Contact Panel */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                    {/* Left Side: Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h3 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                        <form className="space-y-5">
                            <input type="text" placeholder="Your Name" className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
                            <input type="email" placeholder="Email Address" className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
                            <textarea placeholder="Your Message" rows={5} className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"></textarea>
                            <motion.button
                                type="submit"
                                className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-600 text-white font-bold rounded-lg shadow-lg"
                                whileHover={{ y: -5, scale: 1.02, boxShadow: '0 10px 15px -3px rgb(16 185 129 / 0.3)' }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                Send Message <FaPaperPlane />
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Right Side: Contact Info */}
                    <motion.div 
                        className="space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                         <h3 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h3>
                         <motion.div className="flex items-start gap-5 group" whileHover={{ x: 5 }}>
                            <FaMapMarkerAlt className="text-3xl text-emerald-500 mt-1 transition-transform group-hover:scale-110" />
                            <div>
                                <h4 className="text-xl font-semibold text-gray-800">Our Office</h4>
                                <p className="text-gray-600">Ministry of Environment, Forest and Climate Change, Indira Paryavaran Bhawan, New Delhi - 110003</p>
                            </div>
                         </motion.div>
                         <motion.div className="flex items-start gap-5 group" whileHover={{ x: 5 }}>
                            <FaEnvelope className="text-3xl text-emerald-500 mt-1 transition-transform group-hover:scale-110" />
                            <div>
                                <h4 className="text-xl font-semibold text-gray-800">Email Us</h4>
                                <a href="mailto:contact@prakritiyoddha.gov.in" className="text-gray-600 hover:text-emerald-600 hover:underline">contact@prakritiyoddha.gov.in</a>
                            </div>
                         </motion.div>
                         <motion.div className="flex items-start gap-5 group" whileHover={{ x: 5 }}>
                            <FaPhone className="text-3xl text-emerald-500 mt-1 transition-transform group-hover:scale-110" />
                            <div>
                                <h4 className="text-xl font-semibold text-gray-800">Call Us</h4>
                                <a href="tel:+91-11-24695262" className="text-gray-600 hover:text-emerald-600 hover:underline">+91-11-24695262</a>
                            </div>
                         </motion.div>
                    </motion.div>
                </div>

                {/* 3. FAQ Section */}
                
            </div>
        </section>
    );
};

export default ContactPage;