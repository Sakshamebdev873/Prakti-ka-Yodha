import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaUsers, FaLeaf } from 'react-icons/fa'; // Using react-icons for feature icons
const Hero = () => {
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
    _jsxs("section", { className: "relative min-h-screen bg-image flex items-center justify-center bg-cover bg-center text-white pt-24 pb-12", children: [_jsx("div", { className: "absolute inset-0 bg-black/40 z-0" }), _jsxs(motion.div, { className: "relative z-10 container mx-auto px-6 text-center", variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsxs(motion.h1, { variants: itemVariants, className: "text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg", children: ["Become a ", _jsx("span", { className: "text-emerald-300", children: "Warrior for Nature" })] }), _jsxs(motion.p, { variants: itemVariants, className: "text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-md", children: ["Join ", _jsx("span", { className: "font-bold text-orange-300", children: "Prakriti Ke Yoddha" }), ", a national mission where you play games, complete challenges, and take real-world action to protect India's environment."] }), _jsx(motion.button, { variants: itemVariants, whileHover: { scale: 1.05, boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)' }, whileTap: { scale: 0.95 }, className: "bg-orange-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl transition-shadow", children: "Start Your Mission" }), _jsxs(motion.div, { variants: itemVariants, className: "mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx(FaPlay, { className: "text-4xl text-emerald-300 mb-3" }), _jsx("h3", { className: "font-semibold text-lg mb-1", children: "Learn Through Play" }), _jsx("p", { className: "text-gray-300 text-sm", children: "Engage with interactive modules and fun quizzes." })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(FaLeaf, { className: "text-4xl text-emerald-300 mb-3" }), _jsx("h3", { className: "font-semibold text-lg mb-1", children: "Real-World Missions" }), _jsx("p", { className: "text-gray-300 text-sm", children: "Take action in your community, from planting trees to waste reduction." })] }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsx(FaUsers, { className: "text-4xl text-emerald-300 mb-3" }), _jsx("h3", { className: "font-semibold text-lg mb-1", children: "Compete & Collaborate" }), _jsx("p", { className: "text-gray-300 text-sm", children: "Join your school's Eco-Club and climb the national leaderboard." })] })] })] })] }));
};
export default Hero;
//# sourceMappingURL=Hero.js.map