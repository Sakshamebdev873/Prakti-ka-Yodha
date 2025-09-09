import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { motion } from "framer-motion";
// UPDATED NavLink component with active state
const NavLink = ({ href, children, }) => {
    const isActive = typeof window !== "undefined" && window.location.pathname === href;
    return (_jsx(motion.a, { href: href, className: `relative font-medium px-4 py-2 rounded-full transition-colors duration-200 ${isActive
            ? "bg-emerald-100 text-emerald-700"
            : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"}`, whileHover: { scale: 1.05 }, children: children }));
};
// The main Header component
const PrakritiYoddhaHeader = () => {
    return (_jsx(motion.header, { initial: { y: -60, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { type: "spring", stiffness: 70, damping: 20, delay: 0.2 }, className: "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200", children: _jsxs("nav", { className: "max-w-7xl mx-auto px-6 py-3 flex justify-between items-center", children: [_jsxs(motion.a, { href: "/", whileHover: { scale: 1.05 }, className: "flex items-center gap-2 text-xl font-bold text-gray-800", children: [_jsx("span", { className: "text-2xl text-emerald-600", children: "\uD83C\uDF43" }), _jsx("span", { className: "hidden sm:inline", children: "Prakriti Ke" }), _jsx("span", { className: "text-orange-500", children: "Yoddha" })] }), _jsxs("div", { className: "hidden md:flex items-center space-x-6", children: [_jsx(NavLink, { href: "/feature", children: "Features" }), _jsx(NavLink, { href: "/impact", children: "Our Impact" }), _jsx(NavLink, { href: "/works", children: "How It Works" }), _jsx(NavLink, { href: "/contact", children: "Contact" })] }), _jsx(motion.a, { href: "/auth", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "bg-emerald-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-emerald-700 transition", children: "Get Started" })] }) }));
};
export default PrakritiYoddhaHeader;
//# sourceMappingURL=Header.js.map