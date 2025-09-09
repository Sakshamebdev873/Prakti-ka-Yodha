import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaChartBar, FaCertificate, FaGlobe, FaMapPin, FaRobot, FaShieldAlt, FaChevronDown } from 'react-icons/fa';
// Data remains the same
const advancedFeatures = [
    { category: "Tracking & Recognition", icon: _jsx(FaChartBar, { size: 24 }), title: "Eco-Score Dashboard", description: "A personalized dashboard tracks key metrics like plastic saved, CO₂ reduced, and water conserved, making your impact visible." },
    { category: "Tracking & Recognition", icon: _jsx(FaCertificate, { size: 24 }), title: "Tiered Badges & Certificates", description: "Progress from a Bronze Sapling to a Gold Earth Guardian, earning official certificates for major milestones." },
    { category: "Real-World Linkages", icon: _jsx(FaGlobe, { size: 24 }), title: "NGO & Community Partnerships", description: "Take on special missions created in partnership with local environmental NGOs, contributing to real on-the-ground projects." },
    { category: "Real-World Linkages", icon: _jsx(FaMapPin, { size: 24 }), title: "Local Action Maps", description: "Find nearby recycling centers, composting facilities, and community eco-events on an interactive map." },
    { category: "AI & Safety", icon: _jsx(FaRobot, { size: 24 }), title: "AI-Driven Smart Features", description: "Experience a personalized journey with AI that adapts quiz difficulty, suggests relevant eco-actions, and helps you track your carbon footprint." },
    { category: "AI & Safety", icon: _jsx(FaShieldAlt, { size: 24 }), title: "Safety & Positive Motivation", description: "Learn in a secure environment with features like anonymous sharing options, positive nudges, and parental involvement tools." },
];
// Animated Background Component
const AnimatedDarkGradient = () => (_jsx(motion.div, { className: "absolute inset-0 z-0", animate: { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }, transition: { duration: 30, ease: 'linear', repeat: Infinity }, style: {
        background: 'linear-gradient(-45deg, #064e3b, #111827, #047857, #134e4a)',
        backgroundSize: '400% 400%',
    } }));
// Accordion Item Sub-Component
// @ts-ignore
const AccordionItem = ({ feature, index, expanded, setExpanded }) => {
    const isOpen = index === expanded;
    return (_jsxs(motion.div, { className: "border-b border-emerald-400/20", initial: false, children: [_jsxs(motion.header, { className: "flex justify-between items-center p-6 cursor-pointer", onClick: () => setExpanded(isOpen ? false : index), whileHover: { backgroundColor: 'rgba(16, 185, 129, 0.1)' }, children: [_jsxs("div", { className: "flex items-center space-x-5", children: [_jsx(motion.div, { className: "text-emerald-400", whileHover: { scale: 1.2, rotate: 5 }, children: feature.icon }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-bold uppercase tracking-wider text-emerald-400", children: feature.category }), _jsx("h3", { className: "text-xl font-bold text-white mt-1", children: feature.title })] })] }), _jsx(motion.div, { animate: { rotate: isOpen ? 180 : 0 }, children: _jsx(FaChevronDown, { className: "text-gray-400" }) })] }), _jsx(AnimatePresence, { initial: false, children: isOpen && (_jsx(motion.section, { initial: "collapsed", animate: "open", exit: "collapsed", variants: {
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 }
                    }, transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }, className: "overflow-hidden", children: _jsx("p", { className: "px-6 pb-6 pl-16 text-gray-300 leading-relaxed", children: feature.description }) }, "content")) })] }));
};
const AdvancedFeaturesDeepDive = () => {
    const [expanded, setExpanded] = useState(0); // Default first item to be open
    return (_jsxs("section", { className: "relative py-20 bg-gray-900 text-white overflow-hidden", children: [_jsx(AnimatedDarkGradient, {}), _jsxs("div", { className: "relative z-10 container mx-auto px-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-extrabold mb-4", children: ["Smart, Safe, and ", _jsx("span", { className: "text-emerald-400", children: "Connected to Reality" })] }), _jsx("p", { className: "text-lg text-gray-300 max-w-3xl mx-auto", children: "Our platform closes the loop between learning, action, and real-world impact, all powered by safe and intelligent technology." })] }), _jsx(motion.div, { className: "max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-emerald-400/30 overflow-hidden", initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7, delay: 0.2 }, children: advancedFeatures.map((feature, index) => (_jsx(AccordionItem, { feature: feature, index: index, expanded: expanded, setExpanded: setExpanded }, index))) })] })] }));
};
export default AdvancedFeaturesDeepDive;
//# sourceMappingURL=AdvanceFeaturesDeepDive.js.map