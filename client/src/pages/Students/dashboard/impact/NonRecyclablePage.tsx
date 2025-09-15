import { motion } from "framer-motion";
import { FaToiletPaper, FaSyringe, FaBan } from "react-icons/fa";
import { GiShatteredGlass, GiCigarette } from "react-icons/gi";

export default function NonRecyclablePage() {
  const items = [
    {
      label: "Used Tissue",
      icon: <FaToiletPaper size={40} />,
      gradient: "from-green-400 via-emerald-500 to-green-700",
    },
    {
      label: "Medical Waste",
      icon: <FaSyringe size={40} />,
      gradient: "from-sky-400 via-blue-500 to-cyan-600",
    },
    {
      label: "Cigarette Butts",
      icon: <GiCigarette size={40} />,
      gradient: "from-orange-400 via-amber-500 to-yellow-600",
    },
    {
      label: "Broken Ceramics/Glass",
      icon: <GiShatteredGlass size={40} />,
      gradient: "from-lime-400 via-green-500 to-emerald-600",
    },
    {
      label: "Plastic Bags (Non-recyclable)",
      icon: <FaBan size={40} />,
      gradient: "from-teal-400 via-cyan-500 to-blue-600",
    },
  ];

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
            🚫 Non-Recyclable Waste
          </h1>
          <span className="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold shadow">
            Handle With Care ⚠️
          </span>
        </motion.header>

        {/* Cards Grid */}
        <motion.section
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12, scale: 1.05 }}
              className={`flex flex-col items-center justify-center p-10 rounded-2xl shadow-2xl text-white bg-gradient-to-br ${item.gradient} hover:shadow-lg hover:shadow-emerald-400/50 transition-all`}
            >
              <motion.div
                className="mb-4 p-6 rounded-full bg-white/20 backdrop-blur-md shadow-inner"
                whileHover={{ rotate: 12, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 180 }}
              >
                {item.icon}
              </motion.div>
              <span className="font-bold text-lg text-center drop-shadow-md">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.section>
      </div>
    </div>
  );
}
