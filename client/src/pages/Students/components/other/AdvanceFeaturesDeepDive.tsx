
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react';
import { FaChartBar, FaCertificate, FaGlobe, FaMapPin, FaRobot, FaShieldAlt, FaChevronDown } from 'react-icons/fa'

// Data remains the same
const advancedFeatures = [
    { category: "Tracking & Recognition", icon: <FaChartBar size={24} />, title: "Eco-Score Dashboard", description: "A personalized dashboard tracks key metrics like plastic saved, CO₂ reduced, and water conserved, making your impact visible." },
    { category: "Tracking & Recognition", icon: <FaCertificate size={24} />, title: "Tiered Badges & Certificates", description: "Progress from a Bronze Sapling to a Gold Earth Guardian, earning official certificates for major milestones." },
    { category: "Real-World Linkages", icon: <FaGlobe size={24} />, title: "NGO & Community Partnerships", description: "Take on special missions created in partnership with local environmental NGOs, contributing to real on-the-ground projects." },
    { category: "Real-World Linkages", icon: <FaMapPin size={24} />, title: "Local Action Maps", description: "Find nearby recycling centers, composting facilities, and community eco-events on an interactive map." },
    { category: "AI & Safety", icon: <FaRobot size={24} />, title: "AI-Driven Smart Features", description: "Experience a personalized journey with AI that adapts quiz difficulty, suggests relevant eco-actions, and helps you track your carbon footprint." },
    { category: "AI & Safety", icon: <FaShieldAlt size={24} />, title: "Safety & Positive Motivation", description: "Learn in a secure environment with features like anonymous sharing options, positive nudges, and parental involvement tools." },
]

// Animated Background Component
const AnimatedDarkGradient = () => (
    <motion.div
      className="absolute inset-0 z-0"
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      style={{
        background: 'linear-gradient(-45deg, #064e3b, #111827, #047857, #134e4a)',
        backgroundSize: '400% 400%',
      }}
    />
);

// Accordion Item Sub-Component
// @ts-ignore
const AccordionItem = ({ feature, index, expanded, setExpanded }) => {
    const isOpen = index === expanded;

    return (
        <motion.div 
            className="border-b border-emerald-400/20"
            initial={false}
        >
            <motion.header
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => setExpanded(isOpen ? false : index)}
                whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
            >
                <div className="flex items-center space-x-5">
                    <motion.div 
                        className="text-emerald-400"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                        {feature.icon}
                    </motion.div>
                    <div>
                        <p className="text-sm font-bold uppercase tracking-wider text-emerald-400">{feature.category}</p>
                        <h3 className="text-xl font-bold text-white mt-1">{feature.title}</h3>
                    </div>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <FaChevronDown className="text-gray-400" />
                </motion.div>
            </motion.header>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-6 pl-16 text-gray-300 leading-relaxed">{feature.description}</p>
                    </motion.section>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


const AdvancedFeaturesDeepDive: React.FC = () => {
    const [expanded, setExpanded] = useState(0); // Default first item to be open

    return (
        <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
            <AnimatedDarkGradient />
            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Smart, Safe, and <span className="text-emerald-400">Connected to Reality</span>
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Our platform closes the loop between learning, action, and real-world impact, all powered by safe and intelligent technology.
                    </p>
                </motion.div>
                <motion.div 
                    className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-emerald-400/30 overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {advancedFeatures.map((feature, index) => (
                       <AccordionItem 
                            key={index} 
                            feature={feature}
                            index={index}
                            expanded={expanded}
                            setExpanded={setExpanded}
                       />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AdvancedFeaturesDeepDive;