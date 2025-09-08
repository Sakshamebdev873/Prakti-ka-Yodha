import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaUserPlus, FaTachometerAlt, FaGamepad, FaAward, FaGlobeAsia, FaCheckCircle, FaMousePointer, FaSchool, FaChartLine, FaTrophy, FaBrain, FaRecycle, FaStar, FaCertificate, FaUserShield, FaGift, FaTree, FaUsers, FaMapMarkedAlt, FaUser, FaChevronDown } from 'react-icons/fa';


const HowItWorksIntro: React.FC = () => {
  return (
    <section className="py-24 bg-white mt-7 text-center">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4"
        >
          Simple Steps, <span className="text-emerald-600">Giant Impact</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
        >
          Joining our national mission is a straightforward and rewarding journey. We've broken down the entire process into a simple path. Scroll down to see exactly how your adventure will unfold, one step at a time.
        </motion.p>
        
        {/* Animated scroll-down cue with micro-interaction */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaChevronDown className="text-3xl text-gray-400 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

// --- Rich Data for the Expanded Steps ---
const journeySteps = [
    {
        step: 1,
        icon: <FaUserPlus />,
        title: "Create Your Yoddha",
        description: "Your adventure begins by creating a unique digital identity. This avatar will represent you on your journey to protect the planet.",
        image: "https://placehold.co/800x600/34d399/FFFFFF/png?text=Avatar+Creation",
        activities: [
            { icon: <FaUserPlus />, text: "Quick & Easy Sign Up" },
            { icon: <FaMousePointer />, text: "Customize Your Avatar's Look" },
            { icon: <FaSchool />, text: "Join Your School's Squadron" },
        ]
    },
    {
        step: 2,
        icon: <FaTachometerAlt />,
        title: "Explore Your Dashboard",
        description: "This is your mission control. From here, you can access daily challenges, track your progress, and see how you stack up against other Yoddhas.",
        image: "https://placehold.co/800x600/f97316/FFFFFF/png?text=Your+Dashboard",
        activities: [
            { icon: <FaCheckCircle />, text: "View Your Daily Mission" },
            { icon: <FaChartLine />, text: "Check Your Eco-Score" },
            { icon: <FaTrophy />, text: "See the Latest Leaderboard" },
        ]
    },
    {
        step: 3,
        icon: <FaGamepad />,
        title: "The Core Loop: Learn, Act, Earn",
        description: "The heart of the platform is a continuous cycle of engagement. Learn through fun mini-games, take action in the real world, and earn points for your efforts.",
        image: "https://placehold.co/800x600/3b82f6/FFFFFF/png?text=Mini-Game+Screen",
        activities: [
            { icon: <FaBrain />, text: "Play Interactive Lessons" },
            { icon: <FaRecycle />, text: "Complete Real-World Tasks" },
            { icon: <FaStar />, text: "Earn Prakriti Points (PP)" },
        ]
    },
    {
        step: 4,
        icon: <FaAward />,
        title: "Level Up & Claim Rewards",
        description: "Your hard work never goes unrewarded. Use your Prakriti Points to unlock amazing customizations and earn prestigious badges.",
        image: "https://placehold.co/800x600/8b5cf6/FFFFFF/png?text=Reward+Store",
        activities: [
            { icon: <FaCertificate />, text: "Unlock Bronze, Silver & Gold Badges" },
            { icon: <FaUserShield />, text: "Get New Gear For Your Avatar" },
            { icon: <FaGift />, text: "Redeem Points for Digital Prizes" },
        ]
    },
    {
        step: 5,
        icon: <FaGlobeAsia />,
        title: "Witness Real-World Impact",
        description: "This is more than just a game. Your digital actions are connected to tangible, positive change for India's environment.",
        image: "https://placehold.co/800x600/ef4444/FFFFFF/png?text=Impact+Map",
        activities: [
            { icon: <FaTree />, text: "Help Plant Real Trees" },
            { icon: <FaUsers />, text: "Contribute to Community Goals" },
            { icon: <FaMapMarkedAlt />, text: "See Your Collective Impact Grow" },
        ]
    },
];

// --- The Main Page Component ---
const SuperInteractiveHowItWorks: React.FC = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end end']
    });

    // The avatar's vertical position is tied to scroll progress
    const avatarY = useTransform(scrollYProgress, [0, 1], ["5%", "95%"]);
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
     <>
     <HowItWorksIntro/>
        <section ref={targetRef} className="relative py-20 bg-white min-h-[500vh]">
            {/* The sticky container for the path and avatar */}
            <div className="sticky top-0 h-screen">
                {/* The Path */}
                <svg width="10" height="100%" viewBox="0 0 10 1000" preserveAspectRatio="xMidYMin slice" className="absolute top-0 left-1/2 -translate-x-1/2 h-full">
                    <path d="M 5 0 V 1000" stroke="#e5e7eb" strokeWidth="10" />
                    <motion.path d="M 5 0 V 1000" stroke="#10b981" strokeWidth="10" strokeLinecap="round" style={{ pathLength }} />
                </svg>

                {/* The Moving Avatar */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-emerald-500"
                    style={{ top: avatarY }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                    >
                       <FaUser className="text-2xl text-emerald-500" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Scrolling Content */}
            <div className="relative z-10 container mx-auto px-6 -mt-[100vh]">
                {/* 1. Page Header */}
                <div className="h-screen flex flex-col justify-center items-center text-center">
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                        <h2 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-6">The Path of a Yoddha</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Your journey to becoming an environmental warrior is simple, fun, and impactful. Scroll down to begin your first mission.</p>
                    </motion.div>
                </div>

                {/* 2. The Journey Steps */}
                <div className="space-y-24">
                    {journeySteps.map((item, index) => {
                        const isReversed = index % 2 !== 0;
                        return (
                            <div key={item.step} className={`relative flex items-center ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                                <div className="hidden md:block w-5/12"></div> {/* Spacer */}
                                <motion.div
                                    className="w-full md:w-7/12"
                                    initial={{ opacity: 0, x: isReversed ? 100 : -100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                >
                                    <motion.div
                                        className="group bg-white p-8 rounded-2xl shadow-2xl border border-gray-100"
                                        whileHover={{ y: -10, scale: 1.03, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.2)" }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <div className="flex items-center gap-5 mb-6">
                                            <div className="flex-shrink-0 w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-inner">{item.icon}</div>
                                            <div>
                                                <p className="text-emerald-600 font-bold">STEP {item.step}</p>
                                                <h3 className="text-3xl font-extrabold text-gray-800">{item.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed mb-6">{item.description}</p>
                                        <div className="space-y-3 mb-6">
                                            {item.activities.map(activity => (
                                                <motion.div key={activity.text} className="flex items-center gap-3 text-gray-700" whileHover={{ x: 5, color: '#059669' }}>
                                                    <div className="text-emerald-500">{activity.icon}</div>
                                                    <span className="font-semibold">{activity.text}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div className="overflow-hidden rounded-lg shadow-lg">
                                            <img src={item.image} alt={item.title} className="w-full transition-transform duration-300 group-hover:scale-105" />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
                
                {/* 3. Final Concluding Section */}
                <div className="h-screen flex flex-col justify-center items-center text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                        <div className="text-6xl text-emerald-500 mb-6">🏁</div>
                        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">Your Path Awaits</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">You've seen the journey, now it's time to take the first step. The planet is waiting for its next hero.</p>
                    </motion.div>
                </div>

            </div>
        </section>
     </>
    );
};

export default SuperInteractiveHowItWorks;