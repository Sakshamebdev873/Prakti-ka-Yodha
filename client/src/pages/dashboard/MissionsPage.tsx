import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRecycle, FaTree, FaBolt, FaCamera, FaCheckCircle, FaStar, FaHeart, FaQuestionCircle } from 'react-icons/fa';
import VerificationModal from './VerificationModal';

const missionsData = [
    { id: 1, title: "Daily Waste Segregation", reward: 50, type: "Daily", icon: <FaRecycle />, description: "Submit a photo of your separated wet and dry waste.", requiresProof: true, status: 'active', progress: 0 },
    { id: 2, title: "Pledge to Go Plastic-Free", reward: 25, type: "Pledge", icon: <FaHeart />, description: "Make a personal commitment to avoid single-use plastics today.", requiresProof: false, status: 'active', progress: 0 },
    { id: 3, title: "Weekly Energy Saver", reward: 200, type: "Weekly", icon: <FaBolt />, description: "Turn off lights in empty rooms all week. Verified by pledge.", requiresProof: false, status: 'completed', progress: 100 },
    { id: 4, title: "Community Tree Planting", reward: 500, type: "Event", icon: <FaTree />, description: "Join the local drive this Saturday and upload a group photo.", requiresProof: true, status: 'active', progress: 0 },
    { id: 5, title: "Eco-Trivia Challenge", reward: 75, type: "Quiz", icon: <FaQuestionCircle />, description: "Score 80% or higher in the water conservation quiz.", requiresProof: false, status: 'completed', progress: 100 },
];

const MissionsPage: React.FC = () => {
    const [missions, setMissions] = useState(missionsData);
    const [filter, setFilter] = useState('Active');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMission, setSelectedMission] = useState(null);

    const openModal = (mission : any) => { setSelectedMission(mission); setIsModalOpen(true); };
    const closeModal = () => { setIsModalOpen(false); };

    const featuredMission = missions.find(m => m.id === 1);
    const filteredMissions = missions.filter(m => {
        if (filter === 'Active') return m.status === 'active' && m.id !== 1;
        if (filter === 'Completed') return m.status === 'completed';
        return m.type === 'Event';
    });

    return (
        <>
            <div className="container mx-auto p-6 pt-28">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Missions Center</h1>
                    <p className="text-lg text-gray-600">Accept challenges, earn points, and make a real-world impact.</p>
                </motion.div>

                {/* Featured Mission */}
                <motion.div 
                    className="group relative mt-8 bg-gradient-to-br from-emerald-500 to-green-600 text-white p-8 rounded-2xl shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                >
                    <FaStar className="absolute -right-10 -top-10 text-9xl text-white/10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125" />
                    <div className="relative z-10">
                        <p className="font-bold uppercase tracking-wider">Featured Daily Mission</p>
                        <h2 className="text-4xl font-extrabold mt-2 mb-4">{featuredMission!.title}</h2>
                        <p className="text-emerald-100 max-w-xl mb-6">{featuredMission!.description}</p>
                        <motion.button onClick={() => openModal(featuredMission)} className="bg-white text-emerald-600 font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2" whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            Accept (+{featuredMission!.reward} PP) <FaCamera />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Mission Filters */}
                <div className="mt-10 flex border-b border-gray-200">
                    {['Active', 'Completed', 'Events'].map(tab => (
                        <button key={tab} onClick={() => setFilter(tab)} className={`px-6 py-3 text-lg font-semibold relative ${filter === tab ? 'text-emerald-600' : 'text-gray-500'}`}>
                            {tab} {filter === tab && <motion.div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-emerald-500" layoutId="missionUnderline" />}
                        </button>
                    ))}
                </div>

                {/* Mission List */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {filteredMissions.map(mission => (
                            <motion.div
                                layout
                                key={mission.id}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className="text-3xl text-emerald-500">{mission.icon}</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">{mission.title}</h3>
                                            <p className="text-gray-500 text-sm">{mission.type}</p>
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-orange-500">+{mission.reward} PP</p>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 my-4">
                                    <motion.div className={mission.status === 'completed' ? "bg-green-500 h-2.5 rounded-full" : "bg-emerald-500 h-2.5 rounded-full"} initial={{ width: 0 }} animate={{ width: `${mission.progress}%` }}/>
                                </div>
                                <motion.button 
                                    onClick={() => mission.requiresProof ? openModal(mission) : alert('Mission Accepted!')}
                                    disabled={mission.status === 'completed'}
                                    className="mt-auto w-full py-2 rounded-full font-semibold transition-colors disabled:bg-gray-100 disabled:text-gray-400 enabled:bg-emerald-100 enabled:text-emerald-700"
                                    whileHover={{ scale: mission.status !== 'completed' ? 1.05 : 1 }}
                                >
                                    {mission.status === 'completed' ? <span className="flex items-center justify-center gap-2"><FaCheckCircle /> Completed</span> : 'Accept Mission'}
                                </motion.button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            <AnimatePresence>{isModalOpen && <VerificationModal missionTitle={selectedMission!.title} onClose={closeModal} />}</AnimatePresence>
        </>
    );
};
export default MissionsPage;