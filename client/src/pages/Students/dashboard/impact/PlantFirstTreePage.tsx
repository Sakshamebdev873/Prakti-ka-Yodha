import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaRecycle, FaTint, FaTree, FaSeedling } from "react-icons/fa";

export default function PlantFirstTreePage() {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* Animated Eco Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, #bbf7d0, transparent 60%), radial-gradient(circle at 80% 70%, #bfdbfe, transparent 60%), radial-gradient(circle at 50% 50%, #fde68a, transparent 70%)",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Eco Particles */}
      {[FaLeaf, FaRecycle, FaTint].map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-400 opacity-30"
          style={{ top: `${15 + i * 25}%`, left: `${10 + i * 30}%` }}
          animate={{ y: [0, -25, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={50} />
        </motion.div>
      ))}

      <div className="relative container mx-auto p-6 pt-24 z-10">
        {/* Header */}
        <motion.header
          className="flex justify-between items-center bg-white/90 backdrop-blur-xl border border-emerald-200 rounded-2xl px-6 py-4 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800 drop-shadow">
            First Sapling Planted <span className="text-green-600">🌱</span>
          </h1>
          <span className="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold shadow">
            Achievement Unlocked 🎉
          </span>
        </motion.header>

        {/* Achievement Card */}
        <motion.section
          className="mt-10 bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-emerald-200 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="mb-6 p-8 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 shadow-lg"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaTree size={80} className="text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            You planted your first sapling! 🌳
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-2xl">
            Every tree planted is a step towards a greener future.  
            This sapling will grow into a strong tree, providing clean air, shade, and shelter for generations.  
            Celebrate this milestone and keep planting! 🌍💚
          </p>
        </motion.section>

        {/* Benefits Grid */}
        <motion.section
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { title: "Absorbs CO₂", color: "from-green-400 via-emerald-500 to-green-700", icon: <FaRecycle size={50} /> },
            { title: "Provides Oxygen", color: "from-sky-400 via-blue-500 to-cyan-600", icon: <FaTint size={50} /> },
            { title: "Supports Biodiversity", color: "from-orange-400 via-amber-500 to-yellow-600", icon: <FaSeedling size={50} /> },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12, scale: 1.05 }}
              className={`flex flex-col items-center justify-center p-10 rounded-2xl shadow-2xl text-white bg-gradient-to-br ${benefit.color} hover:shadow-lg hover:shadow-emerald-400/50 transition-all`}
            >
              <motion.div
                className="mb-4 p-6 rounded-full bg-white/20 backdrop-blur-md shadow-inner"
                whileHover={{ rotate: 12, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 180 }}
              >
                {benefit.icon}
              </motion.div>
              <span className="font-bold text-lg text-center drop-shadow-md">
                {benefit.title}
              </span>
            </motion.div>
          ))}
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold shadow-lg hover:shadow-emerald-400/50 transition"
          >
            🌱 Plant Another Sapling
          </motion.button>
          <span className="text-gray-600 text-sm italic">
            Keep growing your impact, one tree at a time.
          </span>
        </motion.section>
      </div>
    </div>
  );
}
