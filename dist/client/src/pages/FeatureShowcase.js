import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Icons for the different features
import { FaGamepad, FaUsers, FaLightbulb, FaChartLine, FaGlobeAsia, FaFistRaised, FaUserShield, FaMapMarkedAlt, FaTrophy, FaBolt, FaHandshake, FaProjectDiagram, FaChalkboardTeacher, FaComments, FaPuzzlePiece, FaQuestionCircle, FaBrain, FaNewspaper, FaFileUpload, FaCertificate, FaMapPin, FaRobot, FaShieldAlt } from 'react-icons/fa';
import AdvancedFeaturesDeepDive from '../components/other/AdvanceFeaturesDeepDive';
import CommunityAndLearningDeepDive from '../components/other/CommunityAndLearningDeepDive';
import GamificationDeepDive from '../components/other/GamificationDeepDive';
// --- Data Structure for all Features ---
const categories = [
    {
        name: 'Gamification',
        icon: _jsx(FaGamepad, { size: 32 }),
        color: 'emerald',
        features: [
            { icon: _jsx(FaTrophy, {}), title: "Daily & Weekly Eco-Challenges", description: "Take on fun, real-world tasks to earn points and build sustainable habits." },
            { icon: _jsx(FaBolt, {}), title: "Eco-Streaks & Power-Ups", description: "Maintain a streak to unlock multipliers like 'Double Points Day' or a 'Skip Penalty' pass." },
            { icon: _jsx(FaUserShield, {}), title: "Avatars & Customization", description: "Create your unique Yoddha! Unlock eco-themed outfits, gear, and animal companions." },
            { icon: _jsx(FaMapMarkedAlt, {}), title: "Quest/Story Mode", description: "Embark on narrative-driven journeys, like saving a local forest or cleaning a virtual river." },
            { icon: _jsx(FaFistRaised, {}), title: "Eco-Battles", description: "Challenge friends to quick-fire quiz duels or mini-game competitions to prove your knowledge." },
        ]
    },
    {
        name: 'Community',
        icon: _jsx(FaUsers, { size: 32 }),
        color: 'orange',
        features: [
            { icon: _jsx(FaUsers, {}), title: "Classroom & Inter-School Competitions", description: "Spark friendly rivalries with leaderboards at the class, school, district, and national levels." },
            { icon: _jsx(FaHandshake, {}), title: "Eco-Buddy System", description: "Pair up with a classmate for joint challenges and accountability, motivating each other to stay on track." },
            { icon: _jsx(FaProjectDiagram, {}), title: "Collaborative Projects", description: "Join forces in Eco-Clubs to tackle large-scale projects like a 'Waste-Free Week' or a campus biodiversity audit." },
            { icon: _jsx(FaComments, {}), title: "Community Wall & Forum", description: "A safe, moderated space to share eco-tips, post photos of your projects, and inspire other Yoddhas." },
        ]
    },
    {
        name: 'Learning',
        icon: _jsx(FaLightbulb, { size: 32 }),
        color: 'blue',
        features: [
            { icon: _jsx(FaPuzzlePiece, {}), title: "Interactive Lessons & Mini-Games", description: "Learn complex topics like waste sorting and energy conservation through engaging, hands-on puzzles." },
            { icon: _jsx(FaQuestionCircle, {}), title: "Eco-Trivia Battles", description: "Test your knowledge in fast-paced, time-based quiz matches against other students." },
            { icon: _jsx(FaBrain, {}), title: "Case Study Simulations", description: "Face realistic environmental scenarios where your decisions have consequences, teaching critical thinking." },
            { icon: _jsx(FaFileUpload, {}), title: "Project Submission Zone", description: "Showcase your creativity by uploading posters, essays, presentations, and videos for projects." },
        ]
    },
    {
        name: 'Tracking & AI',
        icon: _jsx(FaChartLine, { size: 32 }),
        color: 'purple',
        features: [
            { icon: _jsx(FaChartLine, {}), title: "Eco-Score Dashboard", description: "A personalized dashboard tracks key metrics like plastic saved, CO₂ reduced, and water conserved." },
            { icon: _jsx(FaCertificate, {}), title: "Tiered Badges & Certificates", description: "Progress from a Bronze Sapling to a Gold Earth Guardian, earning official certificates for milestones." },
            { icon: _jsx(FaRobot, {}), title: "AI-Driven Smart Features", description: "Experience a personalized journey with AI that adapts quiz difficulty and suggests relevant eco-actions." },
            { icon: _jsx(FaShieldAlt, {}), title: "Safety & Positive Motivation", description: "Learn in a secure environment with anonymous sharing options, positive nudges, and parental tools." },
        ]
    },
];
const InteractiveFeaturesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    // Animation variants for the detail list container
    const listContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
        exit: { opacity: 0 }
    };
    // Animation variants for each item in the detail list
    const listItemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
    };
    return (_jsxs(_Fragment, { children: [_jsx("section", { className: "py-20 bg-gray-50 mt-7 min-h-screen", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-extrabold text-gray-800 mb-4", children: "An Ecosystem of Engagement" }), _jsx("p", { className: "text-lg text-gray-600 max-w-3xl mx-auto", children: "Explore the powerful features that make Prakriti Ke Yoddha a one-of-a-kind platform. Click a category to learn more." })] }), _jsx("div", { className: "flex flex-wrap justify-center gap-4 md:gap-6 mb-16", children: categories.map((cat) => {
                                const isSelected = selectedCategory.name === cat.name;
                                return (_jsx(motion.button, { onClick: () => setSelectedCategory(cat), className: `relative w-full md:w-auto flex-1 md:flex-initial text-left px-6 py-4 rounded-xl shadow-lg border-2 transition-all duration-300 ${isSelected ? 'shadow-2xl' : 'opacity-70'}`, style: {
                                        borderColor: isSelected ? `var(--color-${cat.color}-500)` : 'transparent',
                                        backgroundColor: isSelected ? 'white' : '#F9FAFB'
                                    }, whileHover: { y: -5, scale: 1.03, opacity: 1 }, whileTap: { scale: 0.98 }, children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `p-3 rounded-lg bg-${cat.color}-100 text-${cat.color}-500`, children: cat.icon }), _jsx("div", { children: _jsx("h3", { className: "text-xl font-bold text-gray-800", children: cat.name }) })] }) }, cat.name));
                            }) }), _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { variants: listContainerVariants, initial: "hidden", animate: "visible", exit: "exit", className: "grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 max-w-5xl mx-auto", children: selectedCategory.features.map((feature, index) => (_jsxs(motion.div, { variants: listItemVariants, className: "group flex items-start space-x-5 p-4 rounded-lg", children: [_jsx("div", { className: `flex-shrink-0 text-3xl text-${selectedCategory.color}-500 mt-1 transition-transform duration-300 group-hover:scale-110`, children: feature.icon }), _jsxs("div", { children: [_jsx("h4", { className: "text-xl font-bold text-gray-800 mb-1", children: feature.title }), _jsx("p", { className: "text-gray-600 leading-relaxed", children: feature.description })] })] }, index))) }, selectedCategory.name) })] }) }), _jsx(AdvancedFeaturesDeepDive, {}), _jsx(CommunityAndLearningDeepDive, {}), _jsx(GamificationDeepDive, {})] }));
};
// You'll need to configure Tailwind to recognize the dynamic color classes.
// In your tailwind.config.js, you might need a safelist.
export default InteractiveFeaturesPage;
//# sourceMappingURL=FeatureShowcase.js.map