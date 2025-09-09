import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { FaFistRaised, FaUserShield, FaMapMarkedAlt, FaTrophy, FaBolt } from 'react-icons/fa';
const gameFeatures = [
    { icon: _jsx(FaTrophy, {}), title: "Daily & Weekly Eco-Challenges", description: "Take on fun, real-world tasks like using a cloth bag or segregating waste to earn points and build sustainable habits." },
    { icon: _jsx(FaBolt, {}), title: "Eco-Streaks & Power-Ups", description: "Maintain a streak of daily challenges to unlock multipliers like 'Double Points Day' or a 'Skip Penalty' pass." },
    { icon: _jsx(FaUserShield, {}), title: "Avatars & Customization", description: "Create your unique Yoddha! Unlock eco-themed outfits, gear, and animal companions by completing missions." },
    { icon: _jsx(FaMapMarkedAlt, {}), title: "Quest/Story Mode", description: "Embark on narrative-driven journeys, like saving a local forest or cleaning a virtual river, making decisions that impact the story." },
    { icon: _jsx(FaFistRaised, {}), title: "Eco-Battles", description: "Challenge your friends to quick-fire quiz duels or mini-game competitions to prove your environmental knowledge and skill." },
];
const GamificationDeepDive = () => {
    return (_jsx("section", { className: "py-20 bg-emerald-50/50", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-extrabold text-gray-800 mb-4", children: ["Where Learning Becomes an ", _jsx("span", { className: "text-emerald-600", children: "Adventure" })] }), _jsx("p", { className: "text-lg text-gray-600 max-w-3xl mx-auto", children: "We use the power of play to make environmental education irresistible. Every feature is designed to be fun, rewarding, and motivating." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10", children: gameFeatures.map((feature, index) => (_jsxs(motion.div, { className: "flex items-start space-x-6 p-6", initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: index * 0.2 }, children: [_jsx("div", { className: "text-4xl text-emerald-500 mt-1", children: feature.icon }), _jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-bold text-gray-800 mb-2", children: feature.title }), _jsx("p", { className: "text-gray-600 leading-relaxed", children: feature.description })] })] }, index))) })] }) }));
};
export default GamificationDeepDive;
//# sourceMappingURL=GamificationDeepDive.js.map