import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA: React.FC = () => {
  return (
    <section 
        id="cta"
        className="relative py-24 bg-cover cta-image bg-center text-white"
        // Use the same background as your hero section for consistency
       
    >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <motion.div
            className="relative z-10 container mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                Are You Ready to Become a Warrior for Nature?
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-10 drop-shadow-md">
                Join thousands of students across India who are making a real difference. Your mission starts now.
            </p>
            <motion.button
                whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 0 25px rgba(251, 191, 36, 0.8)',
                    y: -5
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 text-white font-bold py-4 px-12 rounded-full text-lg shadow-xl transition-all"
            >
                Start Your Mission Now
            </motion.button>
        </motion.div>
    </section>
  );
};

export default FinalCTA;