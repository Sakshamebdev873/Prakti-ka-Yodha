import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaYoutube, FaPaperPlane } from 'react-icons/fa';
// Array for social media links with icons for cleaner mapping
const socialLinks = [
    { icon: _jsx(FaTwitter, { size: 20 }), url: '#' },
    { icon: _jsx(FaInstagram, { size: 20 }), url: '#' },
    { icon: _jsx(FaYoutube, { size: 20 }), url: '#' },
];
const Footer = () => {
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
    return (_jsxs("footer", { className: "relative bg-cover bg-emerald-800 text-white bg-center ", style: { backgroundImage: `url('/images/pixel-hero-bg.jpg')` }, children: [_jsx("div", { className: "absolute inset-0   backdrop-blur-sm z-0" }), _jsxs(motion.div, { className: "relative z-10 container mx-auto px-6 py-20", variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.3 }, children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-6 gap-10", children: [_jsxs(motion.div, { className: "col-span-1 md:col-span-2", variants: itemVariants, children: [_jsxs("a", { href: "/", className: "flex items-center gap-2 text-2xl font-bold text-white mb-4", children: [_jsx("span", { className: "text-2xl text-emerald-400", children: "\uD83C\uDF43" }), _jsx("span", { children: "Prakriti Ke" }), _jsx("span", { className: "text-orange-400", children: "Yoddha" })] }), _jsx("p", { className: "text-gray-300 max-w-md", children: "A national mission to transform environmental education into a fun, gamified adventure for the next generation of eco-warriors." })] }), _jsxs(motion.div, { variants: itemVariants, children: [_jsx("h4", { className: "text-lg font-semibold mb-4", children: "Explore" }), _jsxs("ul", { className: "space-y-3", children: [_jsx("li", { children: _jsx(motion.a, { href: "#features", whileHover: { y: -2, color: '#34d399' }, className: "transition-colors", children: "Features" }) }), _jsx("li", { children: _jsx(motion.a, { href: "#impact", whileHover: { y: -2, color: '#34d399' }, className: "transition-colors", children: "Impact" }) }), _jsx("li", { children: _jsx(motion.a, { href: "#how-it-works", whileHover: { y: -2, color: '#34d399' }, className: "transition-colors", children: "How It Works" }) }), _jsx("li", { children: _jsx(motion.a, { href: "/login", whileHover: { y: -2, color: '#34d399' }, className: "transition-colors", children: "Login" }) })] })] }), _jsxs(motion.div, { className: "col-span-1 md:col-span-3", variants: itemVariants, children: [_jsx("h4", { className: "text-lg font-semibold mb-4", children: "Join the Mission" }), _jsx("p", { className: "text-gray-300 mb-4", children: "Get the latest updates, mission alerts, and success stories straight to your inbox." }), _jsxs("form", { className: "flex", children: [_jsx("input", { type: "email", placeholder: "Enter your email", className: "w-full px-4 py-3 rounded-l-lg bg-gray-800/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" }), _jsx(motion.button, { type: "submit", className: "bg-emerald-600 px-5 py-3 rounded-r-lg text-white", whileHover: { scale: 1.05, backgroundColor: '#059669' }, whileTap: { scale: 0.95 }, children: _jsx(FaPaperPlane, {}) })] }), _jsxs("div", { className: "mt-6", children: [_jsx("h4", { className: "text-lg font-semibold mb-3", children: "Follow Us" }), _jsx("div", { className: "flex space-x-5", children: socialLinks.map((link, index) => (_jsx(motion.a, { href: link.url, target: "_blank", rel: "noopener noreferrer", whileHover: { y: -3, scale: 1.2, color: '#34d399' }, children: link.icon }, index))) })] })] })] }), _jsx(motion.div, { className: "mt-16 pt-8 border-t border-gray-200/20 text-center", initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.5 }, children: _jsxs("p", { className: "text-gray-400", children: ["\u00A9 ", new Date().getFullYear(), " Prakriti Ke Yoddha. An Initiative by the Government of India."] }) })] })] }));
};
export default Footer;
//# sourceMappingURL=Footer.js.map