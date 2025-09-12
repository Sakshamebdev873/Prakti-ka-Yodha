import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
    { label: "Dashboard", img: "https://placehold.co/1200x800/22c55e/FFFFFF/png?text=Your+Dashboard" },
    { label: "Missions", img: "https://placehold.co/1200x800/f97316/FFFFFF/png?text=Daily+Missions" },
    { label: "Leaderboard", img: "https://placehold.co/1200x800/3b82f6/FFFFFF/png?text=National+Leaderboard" },
    { label: "Avatar", img: "https://placehold.co/1200x800/8b5cf6/FFFFFF/png?text=Customize+Avatar" },
];

const PlatformPreview: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <section id="preview" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">A Glimpse of the Adventure</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the key features that make Prakriti Ke Yoddha an exciting and rewarding experience.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-2 md:space-x-4">
            {tabs.map(tab => (
                <button
                    key={tab.label}
                    className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-colors relative ${selectedTab.label === tab.label ? 'text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setSelectedTab(tab)}
                >
                    {selectedTab.label === tab.label && (
                        <motion.div layoutId="underline" className="absolute inset-0 bg-emerald-500 rounded-full z-0" />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                </button>
            ))}
        </div>

        {/* Mock Browser with content */}
        <motion.div 
            className="max-w-4xl mx-auto rounded-xl shadow-2xl border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
        >
            <div className="p-3 bg-gray-100 rounded-t-xl flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="aspect-video w-full bg-gray-200">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={selectedTab.label}
                        src={selectedTab.img}
                        alt={selectedTab.label}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    />
                </AnimatePresence>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformPreview;