import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaUserPlus, FaTasks, FaTrophy, FaGlobeAsia } from 'react-icons/fa';

// Expanded and more thematic steps array
const steps = [
  {
    icon: <FaUserPlus size={32} className="text-white" />,
    title: "Create Your Yoddha",
    description: "Sign up in seconds, customize your unique warrior avatar, and officially join your school's squadron on our national platform."
  },
  {
    icon: <FaTasks size={32} className="text-white" />,
    title: "Accept Your Missions",
    description: "Dive into daily challenges and engaging learning modules. Each task you complete earns you valuable Prakriti Points (PP)."
  },
  {
    icon: <FaTrophy size={32} className="text-white" />,
    title: "Claim Your Rewards",
    description: "Use your PP to unlock exclusive badges, new gear for your avatar, and climb the ranks on the school and national leaderboards."
  },
  {
    icon: <FaGlobeAsia size={32} className="text-white" />,
    title: "See Real-World Impact",
    description: "Track your personal contribution and watch as your collective actions lead to real trees being planted across India. Your progress matters!"
  },
];

const HowItWorks: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"] // Track from when the center of the element hits the center of the viewport
  });

  // Transform scroll progress to animate the line drawing
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how-it-works" className="py-20 bg-gray-50/50">
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
            Your Journey Begins Here
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Becoming a Warrior for Nature is simple, fun, and impactful. Follow these steps to get started.
          </p>
        </motion.div>

        {/* Main container for steps and the connecting line */}
        <div className="relative">
          {/* The SVG line (only visible on desktop) */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none">
              <motion.path
                d="M50 50 Q 250 50, 250 150 T 450 250 Q 650 250, 750 150 T 950 50"
                fill="none"
                strokeWidth="4"
                strokeDasharray="1"
                strokeDashoffset="0"
                className="stroke-emerald-300"
                style={{ pathLength }} // This animates the line drawing
              />
            </svg>
          </div>

          {/* Grid layout for the steps */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: index * 0.3 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              >
                {/* Icon Circle */}
                <div className="mb-5 bg-gradient-to-br from-emerald-500 to-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;