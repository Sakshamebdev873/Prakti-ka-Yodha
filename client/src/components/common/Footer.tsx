import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaYoutube, FaPaperPlane } from 'react-icons/fa';

// Array for social media links with icons for cleaner mapping
const socialLinks = [
  { icon: <FaTwitter size={20} />, url: '#' },
  { icon: <FaInstagram size={20} />, url: '#' },
  { icon: <FaYoutube size={20} />, url: '#' },
];

const Footer: React.FC = () => {
    
    // Animation variants for staggering the footer columns
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2, delayChildren: 0.1 },
        },
    };
    
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

  return (
    <footer 
        className="relative bg-cover bg-emerald-800 text-white bg-center "
        style={{ backgroundImage: `url('/images/pixel-hero-bg.jpg')` }}
    >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0   backdrop-blur-sm z-0"></div>

      <motion.div 
        className="relative z-10 container mx-auto px-6 py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          
          {/* Column 1: About */}
          <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
            <a href="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
                <span className="text-2xl text-emerald-400">🍃</span>
                <span>Prakriti Ke</span>
                <span className="text-orange-400">Yoddha</span>
            </a>
            <p className="text-gray-300 max-w-md">
              A national mission to transform environmental education into a fun, gamified adventure for the next generation of eco-warriors.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              <li><motion.a href="#features" whileHover={{ y: -2, color: '#34d399' }} className="transition-colors">Features</motion.a></li>
              <li><motion.a href="#impact" whileHover={{ y: -2, color: '#34d399' }} className="transition-colors">Impact</motion.a></li>
              <li><motion.a href="#how-it-works" whileHover={{ y: -2, color: '#34d399' }} className="transition-colors">How It Works</motion.a></li>
              <li><motion.a href="/login" whileHover={{ y: -2, color: '#34d399' }} className="transition-colors">Login</motion.a></li>
            </ul>
          </motion.div>

          {/* Column 3: Join the Mission (Newsletter) */}
          <motion.div className="col-span-1 md:col-span-3" variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4">Join the Mission</h4>
            <p className="text-gray-300 mb-4">Get the latest updates, mission alerts, and success stories straight to your inbox.</p>
            <form className="flex">
                <input 
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-l-lg bg-gray-800/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
                <motion.button
                    type="submit"
                    className="bg-emerald-600 px-5 py-3 rounded-r-lg text-white"
                    whileHover={{ scale: 1.05, backgroundColor: '#059669' }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaPaperPlane />
                </motion.button>
            </form>
            <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
                <div className="flex space-x-5">
                    {socialLinks.map((link, index) => (
                        <motion.a key={index} href={link.url} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, scale: 1.2, color: '#34d399' }}>
                            {link.icon}
                        </motion.a>
                    ))}
                </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
            className="mt-16 pt-8 border-t border-gray-200/20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Prakriti Ke Yoddha. An Initiative by the Government of India.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;