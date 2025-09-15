import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaUsers, FaLeaf } from 'react-icons/fa'; // Using react-icons for feature icons

const Hero: React.FC = () => {
  // Animation variants for staggering child elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    // The main section with the pixel art background image

    <section
      className="relative min-h-screen bg-image flex items-center justify-center bg-cover bg-center text-white pt-24 pb-12"

    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <motion.div
        className="relative z-10 container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
        >
          Become a <span className="text-emerald-300">Warrior for Nature</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-md"
        >
          Join <span className="font-bold text-orange-300">Prakriti Ke Yoddha</span>, a national mission where you play games, complete challenges, and take real-world action to protect India's environment.
        </motion.p>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl transition-shadow"
        >
          Start Your Mission
        </motion.button>

        {/* Added "More Content" section with key features */}
        <motion.div
          variants={itemVariants}
          className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
        >
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <FaPlay className="text-4xl text-emerald-300 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Learn Through Play</h3>
            <p className="text-gray-300 text-sm">Engage with interactive modules and fun quizzes.</p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <FaLeaf className="text-4xl text-emerald-300 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Real-World Missions</h3>
            <p className="text-gray-300 text-sm">Take action in your community, from planting trees to waste reduction.</p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <FaUsers className="text-4xl text-emerald-300 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Compete & Collaborate</h3>
            <p className="text-gray-300 text-sm">Join your school's Eco-Club and climb the national leaderboard.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;