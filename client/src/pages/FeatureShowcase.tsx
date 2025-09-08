import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// Icons for the different features
import { 
    FaGamepad, FaUsers, FaLightbulb, FaChartLine, FaGlobeAsia, FaFistRaised, FaUserShield, FaMapMarkedAlt, FaTrophy, FaBolt, FaHandshake, FaProjectDiagram, FaChalkboardTeacher, FaComments, FaPuzzlePiece, FaQuestionCircle, FaBrain, FaNewspaper, FaFileUpload, FaCertificate, FaMapPin, FaRobot, FaShieldAlt
} from 'react-icons/fa';
import AdvancedFeaturesDeepDive from '../components/other/AdvanceFeaturesDeepDive';
import CommunityAndLearningDeepDive from '../components/other/CommunityAndLearningDeepDive';
import GamificationDeepDive from '../components/other/GamificationDeepDive';

// --- Data Structure for all Features ---
const categories = [
    {
        name: 'Gamification',
        icon: <FaGamepad size={32} />,
        color: 'emerald',
        features: [
            { icon: <FaTrophy />, title: "Daily & Weekly Eco-Challenges", description: "Take on fun, real-world tasks to earn points and build sustainable habits." },
            { icon: <FaBolt />, title: "Eco-Streaks & Power-Ups", description: "Maintain a streak to unlock multipliers like 'Double Points Day' or a 'Skip Penalty' pass." },
            { icon: <FaUserShield />, title: "Avatars & Customization", description: "Create your unique Yoddha! Unlock eco-themed outfits, gear, and animal companions." },
            { icon: <FaMapMarkedAlt />, title: "Quest/Story Mode", description: "Embark on narrative-driven journeys, like saving a local forest or cleaning a virtual river." },
            { icon: <FaFistRaised />, title: "Eco-Battles", description: "Challenge friends to quick-fire quiz duels or mini-game competitions to prove your knowledge." },
        ]
    },
    {
        name: 'Community',
        icon: <FaUsers size={32} />,
        color: 'orange',
        features: [
            { icon: <FaUsers />, title: "Classroom & Inter-School Competitions", description: "Spark friendly rivalries with leaderboards at the class, school, district, and national levels." },
            { icon: <FaHandshake />, title: "Eco-Buddy System", description: "Pair up with a classmate for joint challenges and accountability, motivating each other to stay on track." },
            { icon: <FaProjectDiagram />, title: "Collaborative Projects", description: "Join forces in Eco-Clubs to tackle large-scale projects like a 'Waste-Free Week' or a campus biodiversity audit." },
            { icon: <FaComments />, title: "Community Wall & Forum", description: "A safe, moderated space to share eco-tips, post photos of your projects, and inspire other Yoddhas." },
        ]
    },
    {
        name: 'Learning',
        icon: <FaLightbulb size={32} />,
        color: 'blue',
        features: [
            { icon: <FaPuzzlePiece />, title: "Interactive Lessons & Mini-Games", description: "Learn complex topics like waste sorting and energy conservation through engaging, hands-on puzzles." },
            { icon: <FaQuestionCircle />, title: "Eco-Trivia Battles", description: "Test your knowledge in fast-paced, time-based quiz matches against other students." },
            { icon: <FaBrain />, title: "Case Study Simulations", description: "Face realistic environmental scenarios where your decisions have consequences, teaching critical thinking." },
            { icon: <FaFileUpload />, title: "Project Submission Zone", description: "Showcase your creativity by uploading posters, essays, presentations, and videos for projects." },
        ]
    },
    {
        name: 'Tracking & AI',
        icon: <FaChartLine size={32} />,
        color: 'purple',
        features: [
            { icon: <FaChartLine />, title: "Eco-Score Dashboard", description: "A personalized dashboard tracks key metrics like plastic saved, CO₂ reduced, and water conserved." },
            { icon: <FaCertificate />, title: "Tiered Badges & Certificates", description: "Progress from a Bronze Sapling to a Gold Earth Guardian, earning official certificates for milestones." },
            { icon: <FaRobot />, title: "AI-Driven Smart Features", description: "Experience a personalized journey with AI that adapts quiz difficulty and suggests relevant eco-actions." },
            { icon: <FaShieldAlt />, title: "Safety & Positive Motivation", description: "Learn in a secure environment with anonymous sharing options, positive nudges, and parental tools." },
        ]
    },
];


const InteractiveFeaturesPage: React.FC = () => {
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
    const listItemVariants : Variants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
     <>
        <section className="py-20 bg-gray-50 mt-7 min-h-screen">
            <div className="container mx-auto px-6">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                        An Ecosystem of Engagement
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Explore the powerful features that make Prakriti Ke Yoddha a one-of-a-kind platform. Click a category to learn more.
                    </p>
                </motion.div>

                {/* Category Selector Hub */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
                    {categories.map((cat) => {
                        const isSelected = selectedCategory.name === cat.name;
                        return (
                            <motion.button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat)}
                                className={`relative w-full md:w-auto flex-1 md:flex-initial text-left px-6 py-4 rounded-xl shadow-lg border-2 transition-all duration-300 ${isSelected ? 'shadow-2xl' : 'opacity-70'}`}
                                style={{ 
                                    borderColor: isSelected ? `var(--color-${cat.color}-500)` : 'transparent',
                                    backgroundColor: isSelected ? 'white' : '#F9FAFB'
                                }}
                                whileHover={{ y: -5, scale: 1.03, opacity: 1 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg bg-${cat.color}-100 text-${cat.color}-500`}>
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{cat.name}</h3>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Detailed Features Display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory.name} // This is crucial for AnimatePresence to detect changes
                        variants={listContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 max-w-5xl mx-auto"
                    >
                        {selectedCategory.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={listItemVariants}
                                className="group flex items-start space-x-5 p-4 rounded-lg"
                            >
                                <div className={`flex-shrink-0 text-3xl text-${selectedCategory.color}-500 mt-1 transition-transform duration-300 group-hover:scale-110`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-1">{feature.title}</h4>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
            <AdvancedFeaturesDeepDive/>
            <CommunityAndLearningDeepDive/>
            <GamificationDeepDive/>
     </>
    );
};

// You'll need to configure Tailwind to recognize the dynamic color classes.
// In your tailwind.config.js, you might need a safelist.
export default InteractiveFeaturesPage;