import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaUserPlus, FaTachometerAlt, FaGamepad, FaAward, FaGlobeAsia, FaCheckCircle, FaMousePointer, FaSchool, FaChartLine, FaTrophy, FaBrain, FaRecycle, FaStar, FaCertificate, FaUserShield, FaGift, FaTree, FaUsers, FaMapMarkedAlt, FaUser, FaChevronDown } from 'react-icons/fa';
const HowItWorksIntro = () => {
    return (_jsx("section", { className: "py-24 bg-white mt-7 text-center", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs(motion.h2, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7, ease: 'easeOut' }, className: "text-4xl md:text-5xl font-extrabold text-gray-800 mb-4", children: ["Simple Steps, ", _jsx("span", { className: "text-emerald-600", children: "Giant Impact" })] }), _jsx(motion.p, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 }, className: "text-lg text-gray-600 max-w-3xl mx-auto mb-12", children: "Joining our national mission is a straightforward and rewarding journey. We've broken down the entire process into a simple path. Scroll down to see exactly how your adventure will unfold, one step at a time." }), _jsx(motion.div, { animate: { y: [0, 10, 0] }, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }, children: _jsx(FaChevronDown, { className: "text-3xl text-gray-400 mx-auto" }) })] }) }));
};
// --- Rich Data for the Expanded Steps ---
const journeySteps = [
    {
        step: 1,
        icon: _jsx(FaUserPlus, {}),
        title: "Create Your Yoddha",
        description: "Your adventure begins by creating a unique digital identity. This avatar will represent you on your journey to protect the planet.",
        image: "https://placehold.co/800x600/34d399/FFFFFF/png?text=Avatar+Creation",
        activities: [
            { icon: _jsx(FaUserPlus, {}), text: "Quick & Easy Sign Up" },
            { icon: _jsx(FaMousePointer, {}), text: "Customize Your Avatar's Look" },
            { icon: _jsx(FaSchool, {}), text: "Join Your School's Squadron" },
        ]
    },
    {
        step: 2,
        icon: _jsx(FaTachometerAlt, {}),
        title: "Explore Your Dashboard",
        description: "This is your mission control. From here, you can access daily challenges, track your progress, and see how you stack up against other Yoddhas.",
        image: "https://placehold.co/800x600/f97316/FFFFFF/png?text=Your+Dashboard",
        activities: [
            { icon: _jsx(FaCheckCircle, {}), text: "View Your Daily Mission" },
            { icon: _jsx(FaChartLine, {}), text: "Check Your Eco-Score" },
            { icon: _jsx(FaTrophy, {}), text: "See the Latest Leaderboard" },
        ]
    },
    {
        step: 3,
        icon: _jsx(FaGamepad, {}),
        title: "The Core Loop: Learn, Act, Earn",
        description: "The heart of the platform is a continuous cycle of engagement. Learn through fun mini-games, take action in the real world, and earn points for your efforts.",
        image: "https://placehold.co/800x600/3b82f6/FFFFFF/png?text=Mini-Game+Screen",
        activities: [
            { icon: _jsx(FaBrain, {}), text: "Play Interactive Lessons" },
            { icon: _jsx(FaRecycle, {}), text: "Complete Real-World Tasks" },
            { icon: _jsx(FaStar, {}), text: "Earn Prakriti Points (PP)" },
        ]
    },
    {
        step: 4,
        icon: _jsx(FaAward, {}),
        title: "Level Up & Claim Rewards",
        description: "Your hard work never goes unrewarded. Use your Prakriti Points to unlock amazing customizations and earn prestigious badges.",
        image: "https://placehold.co/800x600/8b5cf6/FFFFFF/png?text=Reward+Store",
        activities: [
            { icon: _jsx(FaCertificate, {}), text: "Unlock Bronze, Silver & Gold Badges" },
            { icon: _jsx(FaUserShield, {}), text: "Get New Gear For Your Avatar" },
            { icon: _jsx(FaGift, {}), text: "Redeem Points for Digital Prizes" },
        ]
    },
    {
        step: 5,
        icon: _jsx(FaGlobeAsia, {}),
        title: "Witness Real-World Impact",
        description: "This is more than just a game. Your digital actions are connected to tangible, positive change for India's environment.",
        image: "https://placehold.co/800x600/ef4444/FFFFFF/png?text=Impact+Map",
        activities: [
            { icon: _jsx(FaTree, {}), text: "Help Plant Real Trees" },
            { icon: _jsx(FaUsers, {}), text: "Contribute to Community Goals" },
            { icon: _jsx(FaMapMarkedAlt, {}), text: "See Your Collective Impact Grow" },
        ]
    },
];
// --- The Main Page Component ---
const SuperInteractiveHowItWorks = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end']
    });
    // The avatar's vertical position is tied to scroll progress
    const avatarY = useTransform(scrollYProgress, [0, 1], ["5%", "95%"]);
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return (_jsxs(_Fragment, { children: [_jsx(HowItWorksIntro, {}), _jsxs("section", { ref: targetRef, className: "relative py-20 bg-white min-h-[500vh]", children: [_jsxs("div", { className: "sticky top-0 h-screen", children: [_jsxs("svg", { width: "10", height: "100%", viewBox: "0 0 10 1000", preserveAspectRatio: "xMidYMin slice", className: "absolute top-0 left-1/2 -translate-x-1/2 h-full", children: [_jsx("path", { d: "M 5 0 V 1000", stroke: "#e5e7eb", strokeWidth: "10" }), _jsx(motion.path, { d: "M 5 0 V 1000", stroke: "#10b981", strokeWidth: "10", strokeLinecap: "round", style: { pathLength } })] }), _jsx(motion.div, { className: "absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-emerald-500", style: { top: avatarY }, children: _jsx(motion.div, { animate: { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }, transition: { duration: 4, ease: 'easeInOut', repeat: Infinity }, children: _jsx(FaUser, { className: "text-2xl text-emerald-500" }) }) })] }), _jsxs("div", { className: "relative z-10 container mx-auto px-6 -mt-[100vh]", children: [_jsx("div", { className: "h-screen flex flex-col justify-center items-center text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut" }, children: [_jsx("h2", { className: "text-5xl md:text-7xl font-extrabold text-gray-800 mb-6", children: "The Path of a Yoddha" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "Your journey to becoming an environmental warrior is simple, fun, and impactful. Scroll down to begin your first mission." })] }) }), _jsx("div", { className: "space-y-24", children: journeySteps.map((item, index) => {
                                    const isReversed = index % 2 !== 0;
                                    return (_jsxs("div", { className: `relative flex items-center ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`, children: [_jsx("div", { className: "hidden md:block w-5/12" }), " ", _jsx(motion.div, { className: "w-full md:w-7/12", initial: { opacity: 0, x: isReversed ? 100 : -100 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, amount: 0.4 }, transition: { type: "spring", stiffness: 50, damping: 20 }, children: _jsxs(motion.div, { className: "group bg-white p-8 rounded-2xl shadow-2xl border border-gray-100", whileHover: { y: -10, scale: 1.03, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.2)" }, transition: { type: 'spring', stiffness: 300 }, children: [_jsxs("div", { className: "flex items-center gap-5 mb-6", children: [_jsx("div", { className: "flex-shrink-0 w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-inner", children: item.icon }), _jsxs("div", { children: [_jsxs("p", { className: "text-emerald-600 font-bold", children: ["STEP ", item.step] }), _jsx("h3", { className: "text-3xl font-extrabold text-gray-800", children: item.title })] })] }), _jsx("p", { className: "text-gray-600 leading-relaxed mb-6", children: item.description }), _jsx("div", { className: "space-y-3 mb-6", children: item.activities.map(activity => (_jsxs(motion.div, { className: "flex items-center gap-3 text-gray-700", whileHover: { x: 5, color: '#059669' }, children: [_jsx("div", { className: "text-emerald-500", children: activity.icon }), _jsx("span", { className: "font-semibold", children: activity.text })] }, activity.text))) }), _jsx("div", { className: "overflow-hidden rounded-lg shadow-lg", children: _jsx("img", { src: item.image, alt: item.title, className: "w-full transition-transform duration-300 group-hover:scale-105" }) })] }) })] }, item.step));
                                }) }), _jsx("div", { className: "h-screen flex flex-col justify-center items-center text-center", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, amount: 0.5 }, transition: { duration: 0.8, ease: "easeOut" }, children: [_jsx("div", { className: "text-6xl text-emerald-500 mb-6", children: "\uD83C\uDFC1" }), _jsx("h2", { className: "text-5xl md:text-6xl font-extrabold text-gray-800 mb-6", children: "Your Path Awaits" }), _jsx("p", { className: "text-xl text-gray-600 max-w-3xl mx-auto", children: "You've seen the journey, now it's time to take the first step. The planet is waiting for its next hero." })] }) })] })] })] }));
};
export default SuperInteractiveHowItWorks;
//# sourceMappingURL=SuperInteractiveHowItWorks.js.map