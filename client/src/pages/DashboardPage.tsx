import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaRecycle, FaUsers, FaLeaf, FaShieldAlt, FaStar, FaBolt, FaGraduationCap, FaFistRaised } from 'react-icons/fa';

// --- MOCK DATA ---
const user = {
    name: "Aarav Sharma",
    avatar: "https://i.pravatar.cc/150?u=aarav",
    level: 7,
    levelName: "Sapling Guardian",
    progress: 65, // Percentage to next level
    prakritiPoints: 1250,
    dailyStreak: 5,
};

const dailyMission = {
    title: "Waste Segregation Challenge",
    description: "Correctly sort 10 different items into wet and dry waste.",
    icon: <FaRecycle />,
    reward: 50,
};

const leaderboard = [
    { name: "Priya S.", score: 1480, avatar: "https://i.pravatar.cc/40?u=priya" },
    { name: "You", score: 1250, avatar: user.avatar, isUser: true },
    { name: "Rohan K.", score: 1190, avatar: "https://i.pravatar.cc/40?u=rohan" },
];

const communityUpdate = {
    author: "Eco-Club",
    action: "started a new collaborative project:",
    title: "Campus Clean-Up Drive",
    time: "2h ago",
};


// --- Main Dashboard Page Component ---
const DashboardPage: React.FC = () => {

    // Animation variants for staggering children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        // Added padding-top to account for the fixed DashboardHeader
        <div className="bg-gray-50/70 min-h-screen p-6 pt-24">
            <motion.div 
                className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* --- LEFT COLUMN: Main User Info & Core Actions --- */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Welcome Header */}
                    <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-5">
                        <motion.img 
                            src={user.avatar} alt={user.name} 
                            className="w-24 h-24 rounded-full border-4 border-emerald-500" 
                            whileHover={{ scale: 1.1, rotate: 3 }}
                        />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Welcome Back, {user.name}!</h1>
                            <p className="text-gray-500">Ready to make a difference today?</p>
                        </div>
                    </motion.div>

                    {/* Daily Mission Card */}
                    <motion.div variants={itemVariants} className="group relative bg-emerald-600 text-white p-8 rounded-2xl shadow-xl overflow-hidden">
                        <div className="absolute -right-8 -bottom-8 text-emerald-700/50 text-[120px] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                            {dailyMission.icon}
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <FaStar className="text-yellow-400"/>
                                <h3 className="text-xl font-bold uppercase tracking-wider">Your Daily Mission</h3>
                            </div>
                            <h2 className="text-3xl font-extrabold mb-2">{dailyMission.title}</h2>
                            <p className="text-emerald-100 mb-6">{dailyMission.description}</p>
                            <motion.button 
                                className="bg-white text-emerald-600 font-bold py-3 px-6 rounded-full shadow-lg"
                                whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            >
                                Start Challenge (+{dailyMission.reward} PP)
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Quick Access Grid */}
                    <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <QuickAccessCard icon={<FaGraduationCap />} label="Learn" bgColor="bg-blue-100" textColor="text-blue-600" />
                        <QuickAccessCard icon={<FaFistRaised />} label="Eco-Battles" bgColor="bg-orange-100" textColor="text-orange-600" />
                        <QuickAccessCard icon={<FaUsers />} label="Community" bgColor="bg-purple-100" textColor="text-purple-600" />
                        <QuickAccessCard icon={<FaShieldAlt />} label="My Avatar" bgColor="bg-teal-100" textColor="text-teal-600" />
                    </motion.div>

                    {/* Community Feed */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Community Buzz</h3>
                        <motion.div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4" whileHover={{ x: 5 }}>
                            <img src="https://i.pravatar.cc/50?u=ecoclub" alt="Eco-Club" className="w-12 h-12 rounded-full"/>
                            <div>
                                <p className="text-gray-600">
                                    <span className="font-bold text-gray-800">{communityUpdate.author}</span> {communityUpdate.action} <a href="#" className="font-bold text-emerald-600 hover:underline">{communityUpdate.title}</a>
                                </p>
                                <p className="text-sm text-gray-400">{communityUpdate.time}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* --- RIGHT COLUMN: Progress & Social --- */}
                <div className="space-y-6">
                    {/* User Progress Card */}
                    <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                        <h3 className="font-bold text-gray-800 text-lg">Level {user.level}: {user.levelName}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-4 my-3 overflow-hidden">
                            <motion.div 
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4" 
                                initial={{ width: 0 }}
                                animate={{ width: `${user.progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        <p className="text-sm text-gray-500">{2500 - user.prakritiPoints} PP to next level</p>
                        <hr className="my-4"/>
                        <div className="flex justify-around">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-emerald-600">{user.prakritiPoints.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Prakriti Points</p>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center items-center gap-1">
                                    <FaBolt className="text-yellow-500"/>
                                    <p className="text-2xl font-bold text-yellow-600">{user.dailyStreak}</p>
                                </div>
                                <p className="text-sm text-gray-500">Day Streak</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Leaderboard */}
                    <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <FaTrophy className="text-2xl text-yellow-500"/>
                            <h3 className="font-bold text-gray-800 text-lg">Classroom Leaderboard</h3>
                        </div>
                        <ul className="space-y-3">
                            {leaderboard.map((player, index) => (
                                <motion.li 
                                    key={player.name}
                                    className={`flex items-center gap-3 p-2 rounded-lg ${player.isUser ? 'bg-emerald-100' : ''}`}
                                    whileHover={{ scale: 1.05, backgroundColor: player.isUser ? '#A7F3D0' : '#F3F4F6' }}
                                >
                                    <span className="font-bold text-gray-500">{index + 1}</span>
                                    <img src={player.avatar} alt={player.name} className="w-8 h-8 rounded-full" />
                                    <span className={`font-semibold ${player.isUser ? 'text-emerald-700' : 'text-gray-700'}`}>{player.name}</span>
                                    <span className="ml-auto font-bold text-gray-600">{player.score}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* My Impact Snapshot */}
                    <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                         <div className="flex items-center gap-3 mb-4">
                            <FaLeaf className="text-2xl text-green-500"/>
                            <h3 className="font-bold text-gray-800 text-lg">My Eco-Impact</h3>
                        </div>
                        <div className="space-y-3 text-gray-600">
                            <p><strong>Plastic Saved:</strong> 5.2 kg</p>
                            <p><strong>CO₂ Reduced:</strong> 12.8 kg</p>
                            <p><strong>Water Conserved:</strong> 350 L</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

// --- Sub-Component for Quick Access Cards ---
const QuickAccessCard = ({ icon, label, bgColor, textColor }) => (
    <motion.div 
        className={`group p-4 rounded-2xl text-center cursor-pointer ${bgColor}`}
        whileHover={{ y: -8, scale: 1.1, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <div className={`text-4xl inline-block ${textColor} transition-transform duration-300 group-hover:scale-125`}>
            {icon}
        </div>
        <p className={`mt-2 font-bold ${textColor}`}>{label}</p>
    </motion.div>
);

export default DashboardPage;