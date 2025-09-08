import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaTasks, FaTrophy, FaGamepad, FaTree, FaUsers, FaChartLine } from 'react-icons/fa';

const featureList = [
    {
      icon: <FaGamepad size={40} className="text-emerald-500" />,
      title: "Gamified Learning Modules",
      description: "Journey through interactive stories and mini-games that teach you about India's unique biodiversity, climate challenges, and conservation efforts."
    },
    {
      icon: <FaTasks size={40} className="text-orange-500" />,
      title: "Daily Prakriti Missions",
      description: "Receive new, fun challenges every day that help you build sustainable habits, from conserving water to reducing plastic use in your home."
    },
    {
      icon: <FaTrophy size={40} className="text-emerald-500" />,
      title: "National Leaderboards",
      description: "Represent your school and state! Earn Prakriti Points for your actions and compete to see who can make the biggest positive impact."
    },
    {
      icon: <FaUsers size={40} className="text-orange-500" />,
      title: "Form School Eco-Clubs",
      description: "Team up with your friends to complete larger projects. Organize clean-up drives or start a school garden and track your club's progress."
    },
    // Add other features if you have them
];

// A dedicated component for each node on the timeline
const FeatureNode = ({ feature, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"]
  });

  // Animate branch width based on scroll
  const branchWidth = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "100%"]);
  const isReversed = index % 2 !== 0;

  return (
    <div ref={ref} className="relative flex justify-center md:justify-normal">
      {/* The Timeline Node and Branch (Desktop only) */}
      <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 w-1/2 items-center ${isReversed ? 'left-0 justify-end' : 'right-0 justify-start'}`}>
        <motion.div className="w-4 h-4 bg-emerald-500 rounded-full z-10" />
        <motion.div className="h-1 bg-emerald-300" style={{ width: branchWidth }} />
      </div>

      {/* The Feature Card */}
      <motion.div
        className={`w-full md:w-5/12 p-6 bg-white rounded-xl shadow-lg border border-gray-100 ${isReversed ? 'md:ml-auto' : ''}`}
        initial={{ opacity: 0, x: isReversed ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 bg-gray-100 p-3 rounded-full">{feature.icon}</div>
          <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
        </div>
        <p className="text-gray-600 leading-relaxed mt-4">{feature.description}</p>
      </motion.div>
    </div>
  );
};


const Features: React.FC = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start center", "end end"]
    });

    // Animate the main vine's height based on scroll
    const vineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="features" className="py-20 bg-emerald-50/50">
      <div ref={ref} className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            The Path of a <span className="text-emerald-600">Prakriti Yoddha</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform is an ecosystem of features designed to help you learn, act, and grow.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
            {/* The Main Vine/String (Desktop only) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-1 h-full bg-emerald-200" />
            <motion.div 
                className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-1 h-full bg-emerald-500 origin-top"
                style={{ scaleY: vineHeight }} // Animates height by scaling
            />
            
            {/* The Feature Nodes */}
            <div className="space-y-12 md:space-y-24">
                {featureList.map((feature, index) => (
                    <FeatureNode key={index} feature={feature} index={index} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Features;