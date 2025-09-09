import React from 'react';
import { motion } from 'framer-motion';
import { FaPuzzlePiece, FaQuestionCircle, FaBrain, FaBookOpen } from 'react-icons/fa';

const learnData = {
    miniGames: [
        { title: "Waste Sorting Challenge", time: "5 min", image: "https://placehold.co/600x400/22c55e/FFFFFF/png?text=Game" },
        { title: "Energy Leak Hunter", time: "8 min", image: "https://placehold.co/600x400/f97316/FFFFFF/png?text=Game" },
    ],
    deepDives: [
        { title: "The Ganges: A River's Story", type: "Case Study", progress: 75, image: "https://placehold.co/600x400/3b82f6/FFFFFF/png?text=Deep+Dive" },
        { title: "Understanding Carbon Footprints", type: "Interactive Article", progress: 20, image: "https://placehold.co/600x400/8b5cf6/FFFFFF/png?text=Deep+Dive" },
        { title: "Biodiversity of the Western Ghats", type: "Video Lesson", progress: 0, image: "https://placehold.co/600x400/ef4444/FFFFFF/png?text=Deep+Dive" },
    ],
};

const LearnPage: React.FC = () => {
    return (
        <div className="container mx-auto p-6 pt-28">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Learning Hub</h1>
                <p className="text-lg text-gray-600">Sharpen your eco-knowledge with interactive lessons and quizzes.</p>
            </motion.div>

            {/* Section: Mini-Games */}
            <motion.div className="mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3"><FaPuzzlePiece className="text-blue-500" /> Learn by Playing</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {learnData.miniGames.map((game, i) => (
                        <motion.div 
                            key={game.title}
                            className="group relative rounded-2xl shadow-xl overflow-hidden"
                            whileHover={{ y: -10 }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <img src={game.image} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 text-white">
                                <span className="text-sm font-bold bg-white/20 px-2 py-1 rounded-full">{game.time}</span>
                                <h3 className="text-3xl font-extrabold mt-2">{game.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Section: Deep Dives */}
            <motion.div className="mt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3"><FaBookOpen className="text-purple-500" /> Deep Dive Modules</h2>
                <div className="space-y-4">
                    {learnData.deepDives.map((dive, i) => (
                        <motion.div
                            key={dive.title}
                            className="group bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-5"
                            whileHover={{ x: 5, scale: 1.01 }}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <img src={dive.image} className="w-28 h-20 rounded-lg object-cover" />
                            <div className="flex-grow">
                                <p className="text-sm font-semibold text-purple-600">{dive.type}</p>
                                <h4 className="text-lg font-bold text-gray-800">{dive.title}</h4>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${dive.progress}%` }}></div>
                                </div>
                            </div>
                            <button className="bg-gray-100 group-hover:bg-purple-500 group-hover:text-white text-gray-700 font-bold py-2 px-4 rounded-full transition-colors">
                                {dive.progress > 0 ? 'Continue' : 'Start'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
export default LearnPage;