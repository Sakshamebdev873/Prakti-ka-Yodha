import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Community Icons
import { FaUsers, FaHandshake, FaProjectDiagram, FaChalkboardTeacher, FaComments } from 'react-icons/fa';
// Learning Icons
import { FaPuzzlePiece, FaQuestionCircle, FaBrain, FaNewspaper, FaFileUpload } from 'react-icons/fa';
const communityFeatures = [
    { icon: _jsx(FaUsers, {}), title: "Classroom & Inter-School Competitions", description: "Spark friendly rivalries with leaderboards tracking performance at the class, school, district, and national levels." },
    { icon: _jsx(FaHandshake, {}), title: "Eco-Buddy System", description: "Pair up with a classmate for joint challenges and accountability, motivating each other to stay on track." },
    { icon: _jsx(FaProjectDiagram, {}), title: "Collaborative Projects", description: "Join forces in Eco-Clubs to tackle large-scale projects like a 'Waste-Free Week' or a campus biodiversity audit." },
    { icon: _jsx(FaComments, {}), title: "Community Wall & Forum", description: "A safe, moderated space to share eco-tips, post photos of your projects, and inspire other Yoddhas across India." },
];
const learningFeatures = [
    { icon: _jsx(FaPuzzlePiece, {}), title: "Interactive Lessons & Mini-Games", description: "Learn complex topics like waste sorting and energy conservation through engaging, hands-on puzzles and games." },
    { icon: _jsx(FaQuestionCircle, {}), title: "Eco-Trivia Battles", description: "Test your knowledge in fast-paced, time-based quiz matches against other students." },
    { icon: _jsx(FaBrain, {}), title: "Case Study Simulations", description: "Face realistic environmental scenarios where your decisions have consequences, teaching critical thinking and problem-solving." },
    { icon: _jsx(FaNewspaper, {}), title: "Eco-Fact / Myth-Buster of the Day", description: "Start your day with a quick, fascinating, and verifiable knowledge bite to build your environmental literacy." },
    { icon: _jsx(FaFileUpload, {}), title: "Project Submission Zone", description: "Showcase your creativity by uploading posters, essays, presentations, and videos for projects and assignments." },
];
const tabs = [{ label: "Community Features" }, { label: "Learning & Engagement" }];
const CommunityAndLearningDeepDive = () => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const featuresToShow = selectedTab.label === "Community Features" ? communityFeatures : learningFeatures;
    return (_jsx("section", { className: "py-20 bg-white", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-extrabold text-gray-800 mb-4", children: ["Unite for Knowledge, ", _jsx("span", { className: "text-orange-500", children: "Collaborate for Change" })] }), _jsx("p", { className: "text-lg text-gray-600 max-w-3xl mx-auto", children: "Learn together, grow together, and make an impact together. Our platform is built on the power of community and interactive education." })] }), _jsx("div", { className: "flex justify-center border-b border-gray-200 mb-12", children: tabs.map(tab => (_jsxs("button", { className: `px-6 py-3 text-lg font-semibold relative ${selectedTab.label === tab.label ? 'text-emerald-600' : 'text-gray-500'}`, onClick: () => setSelectedTab(tab), children: [tab.label, selectedTab.label === tab.label && (_jsx(motion.div, { className: "absolute bottom-[-1px] left-0 right-0 h-[3px] bg-emerald-500", layoutId: "underline" }))] }, tab.label))) }), _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.4 }, className: "grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12", children: featuresToShow.map((feature, index) => (_jsxs("div", { className: "flex items-start space-x-5", children: [_jsx("div", { className: "text-3xl text-orange-500 mt-1 flex-shrink-0", children: feature.icon }), _jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-bold text-gray-800 mb-2", children: feature.title }), _jsx("p", { className: "text-gray-600 leading-relaxed", children: feature.description })] })] }, index))) }, selectedTab.label) })] }) }));
};
export default CommunityAndLearningDeepDive;
//# sourceMappingURL=CommunityAndLearningDeepDive.js.map