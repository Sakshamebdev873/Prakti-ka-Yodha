import React from "react";
import { motion } from "framer-motion";

// UPDATED NavLink component with active state
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  const isActive = typeof window !== "undefined" && window.location.pathname === href;

  return (
    <motion.a
      href={href}
      className={`relative font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
        isActive
          ? "bg-emerald-100 text-emerald-700"
          : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
      }`}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.a>
  );
};

// The main Header component
const PrakritiYoddhaHeader: React.FC = () => {
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

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="/student/feature">Features</NavLink>
          <NavLink href="/student/impact">Our Impact</NavLink>
          <NavLink href="/student/works">How It Works</NavLink>
          <NavLink href="/student/contact">Contact</NavLink>
        </div>

        {/* Get Started Button */}
        <motion.a
          href="/student/auth"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-emerald-700 transition"
        >
          Get Started
        </motion.a>
      </nav>
    </motion.header>
  );
};

export default PrakritiYoddhaHeader;
