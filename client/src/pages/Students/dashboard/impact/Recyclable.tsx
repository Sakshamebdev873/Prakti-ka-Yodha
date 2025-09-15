import React from "react";
import { motion } from "framer-motion";
import { FaRecycle, FaBox, FaCogs } from "react-icons/fa";
import { GiWaterBottle } from "react-icons/gi";

export default function Recyclable() {
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

      <div className="relative container mx-auto p-6 pt-24 z-10">
        {/* Header */}
        <motion.header
          className="flex justify-between items-center bg-white/90 backdrop-blur-xl border border-emerald-200 rounded-2xl px-6 py-4 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800 drop-shadow">
            Recyclable Waste <span className="text-blue-600">♻️</span>
          </h1>
          <span className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-400 to-sky-600 text-white font-semibold shadow">
            Save Resources 🌍
          </span>
        </motion.header>

        {/* Achievement Card */}
        <motion.section
          className="mt-10 bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-blue-200 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="mb-6 p-8 rounded-full bg-gradient-to-br from-blue-400 via-sky-500 to-blue-700 shadow-lg"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <FaRecycle size={80} className="text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recycling Makes a Difference ♻️
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-2xl">
            Recycling conserves natural resources, reduces pollution, and saves
            energy. By recycling properly, you’re contributing to a cleaner,
            greener future while reducing landfill waste.
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
            {
              title: "Plastic Bottles",
              color: "from-sky-400 via-blue-500 to-cyan-600",
              icon: <GiWaterBottle size={50} />,
            },
            {
              title: "Cardboard & Paper",
              color: "from-green-400 via-emerald-500 to-green-700",
              icon: <FaBox size={50} />,
            },
            {
              title: "Metal & Glass",
              color: "from-orange-400 via-amber-500 to-yellow-600",
              icon: <FaCogs size={50} />,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12, scale: 1.05 }}
              className={`flex flex-col items-center justify-center p-10 rounded-2xl shadow-2xl text-white bg-gradient-to-br ${item.color} hover:shadow-lg hover:shadow-emerald-400/50 transition-all`}
            >
              <motion.div
                className="mb-4 p-6 rounded-full bg-white/20 backdrop-blur-md shadow-inner"
                whileHover={{ rotate: 12, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 180 }}
              >
                {item.icon}
              </motion.div>
              <span className="font-bold text-lg text-center drop-shadow-md">
                {item.title}
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
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-sky-600 text-white rounded-full font-bold shadow-lg hover:shadow-blue-400/50 transition"
          >
            ♻️ Start Recycling Today
          </motion.button>
          <span className="text-gray-600 text-sm italic">
            Small actions today, big impact tomorrow.
          </span>
        </motion.section>
      </div>
    </div>
  );
}
