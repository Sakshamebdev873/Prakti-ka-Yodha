import React from 'react';
import { motion } from 'framer-motion';
import { FaPuzzlePiece, FaBookOpen, FaTrophy, FaLightbulb, FaPlay } from 'react-icons/fa';

// --- Animated Background Component ---
const AnimatedBackground = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-50">
        <motion.div 
            className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-200 rounded-full filter blur-3xl opacity-40 animate-blob"
        />
        <motion.div 
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-200 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"
        />
        <motion.div 
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"
        />
    </div>
);

const LearnPage: React.FC = () => {
    // --- FIX: Data is now INSIDE the component to prevent errors ---
    const learnData = {
        featuredModule: { title: "The Ganges: A River's Story", type: "Case Study", progress: 75, image: "/images/learn-dive-ganges.jpg", description: "An in-depth look at the challenges and triumphs of cleaning India's most sacred river." },
        miniGames: [
            { title: "Waste Sorting Challenge", time: "5 min", image: "/images/learn-game-waste.jpg" },
            { title: "Energy Leak Hunter", time: "8 min", image: "/images/learn-game-energy.jpg" },
        ],
        deepDives: [
            { title: "Understanding Carbon Footprints", type: "Interactive Article", progress: 20, image: "/images/learn-dive-carbon.jpg" },
            { title: "Biodiversity of the Western Ghats", type: "Video Lesson", progress: 0, image: "/images/learn-dive-ghats.jpg" },
        ],
    };

    return (
        <div className="relative min-h-screen p-6 pt-28">
            <AnimatedBackground />
            <div className="container mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">The Learning Hub</h1>
                    <p className="text-lg text-gray-600">Knowledge is your greatest power. Sharpen it here.</p>
                </motion.div>

                {/* Featured Module */}
                <motion.div 
                    className="group mt-8 relative grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/30"
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}
                    whileHover={{ boxShadow: '0 20px 25px -5px rgba(5, 150, 105, 0.2), 0 8px 10px -6px rgba(5, 150, 105, 0.2)' }}
                >
                    <div className="overflow-hidden rounded-xl shadow-lg">
                         <motion.img src={learnData.featuredModule.image} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="font-bold text-emerald-600">FEATURED MODULE</p>
                        <h2 className="text-4xl font-extrabold text-gray-800 mt-2">{learnData.featuredModule.title}</h2>
                        <p className="text-gray-600 mt-4">{learnData.featuredModule.description}</p>
                        <motion.button className="mt-6 bg-emerald-600 text-white font-bold py-3 px-6 rounded-full self-start flex items-center gap-2" whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <FaPlay /> Continue Module
                        </motion.button>
                    </div>
                </motion.div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Mini-Games & Deep Dives */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3"><FaPuzzlePiece className="text-blue-500" /> Learn by Playing</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* ... Mini-Games mapping ... */}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3"><FaBookOpen className="text-purple-500" /> More Deep Dives</h2>
                            <div className="space-y-4">
                                {/* ... Deep Dives mapping ... */}
                            </div>
                        </motion.div>
                    </div>
                    
                    {/* Right Sidebar */}
                    <div className="space-y-8 sticky top-24">
                        <motion.div 
                            className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/40"
                            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                        >
                            <h3 className="font-bold text-gray-800 text-xl flex items-center gap-3 mb-4"><FaTrophy className="text-orange-500" /> Knowledge Arena</h3>
                            {/* ... Quiz mapping ... */}
                        </motion.div>
                        <motion.div 
                            className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/40"
                            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        >
                            <h3 className="font-bold text-gray-800 text-lg mb-2 flex items-center gap-2"><FaLightbulb className="text-yellow-400"/> Daily Knowledge Bite</h3>
                            <p className="text-gray-700">A single glass bottle can be recycled and reused up to 30 times without losing its purity or quality.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LearnPage;