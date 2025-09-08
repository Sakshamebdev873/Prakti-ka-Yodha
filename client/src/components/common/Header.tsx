import React from "react";
import { motion } from "framer-motion";

// UPDATED NavLink component with a "pill" background effect
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <motion.a
    href={href}
    className="relative font-medium text-gray-700 px-4 py-2 rounded-full"
    whileHover={{
      backgroundColor: "rgba(16, 185, 129, 0.1)", // A light emerald background
      color: "rgb(5, 150, 105)", // A darker emerald text color
    }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.a>
);

// The main Header component (no changes needed here)
const PrakritiYoddhaHeader: React.FC = () => {
  // Mock user data for demonstration
  const user = {
    name: "Aarav",
    avatar: "https://i.pravatar.cc/40?u=aarav",
    prakritiPoints: 1250,
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200"
    >
      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-xl font-bold text-gray-800"
        >
          <span className="text-2xl text-emerald-600">🍃</span>
          <span className="hidden sm:inline">Prakriti Ke</span>
          <span className="text-orange-500">Yoddha</span>
        </motion.a>

        {/* Navigation Links with the new effect */}
      <div className="hidden md:flex items-center space-x-6"> {/* Increased spacing slightly for new text */}
  <NavLink href="/feature">Features</NavLink>
  <NavLink href="/impact">Our Impact</NavLink>
  <NavLink href="#how-it-works">How It Works</NavLink>
  <NavLink href="#contact">Contact</NavLink> {/* Assuming you have a contact section in the footer or elsewhere */}
</div>

        {/* User Profile & Gamification */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 cursor-pointer"
          >
            <span className="text-emerald-600 font-bold">🌿</span>
            <span className="font-semibold text-gray-700">{user.prakritiPoints} PP</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-orange-400 cursor-pointer"
            />
          </motion.div>
        </div>
      </nav>
    </motion.header>
  );
};

export default PrakritiYoddhaHeader;