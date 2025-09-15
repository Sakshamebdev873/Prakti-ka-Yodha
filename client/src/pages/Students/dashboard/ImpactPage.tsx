import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaRecycle, FaTint, FaAward, FaTree } from "react-icons/fa";
import { Link } from "react-router-dom";

// --- Circular Progress Component ---
const CircularProgress: React.FC<{
  progress: number;
  size: number;
  strokeWidth: number;
  color: string;
}> = ({ progress, size, strokeWidth, color }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const colorMap: Record<string, string> = {
    emerald: "#10b981",
    blue: "#3b82f6",
    orange: "#f97316",
  };

  return (
    <svg width={size} height={size} className="mx-auto">
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <motion.circle
        stroke={colorMap[color] || "#10b981"}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeLinecap="round"
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="font-bold text-gray-700"
      >
        {progress}%
      </text>
    </svg>
  );
};

const ImpactPage: React.FC = () => {
  const memories = [
    {
      title: "Waste Segregation - Day 5",
      icon: <FaRecycle size={60} className="text-white" />,
      bg: "from-green-400 via-emerald-500 to-green-700",
      href: "waste_segregate",
    },
    {
      title: "Community Clean-up",
      icon: <FaLeaf size={60} className="text-white" />,
      bg: "from-emerald-400 via-lime-500 to-green-600",
      href: "community_cleanup",
    },
    {
      title: "First Sapling Planted",
      icon: <FaTree size={60} className="text-white" />,
      bg: "from-sky-400 via-blue-500 to-cyan-600",
      href: "first_saple",
    },
  ];

  const stats = [
    { value: 52, label: "5.2kg Plastic Saved", color: "emerald" },
    { value: 78, label: "12.8kg CO₂ Reduced", color: "blue" },
    { value: 35, label: "350L Water Conserved", color: "orange" },
  ];

  const trophyColors = ["bg-yellow-400", "bg-sky-400", "bg-green-400", "bg-pink-400"];

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

      <div className="relative container mx-auto p-6 pt-28 z-10">
        {/* Page Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2 drop-shadow-lg tracking-tight">
            🌍 Warrior's Chronicle
          </h1>
          <p className="text-xl text-gray-700">
            Your epic journey, achievements, and contributions to the planet.
          </p>
        </motion.div>

        {/* Hero Profile Card */}
        <motion.div
          className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-emerald-200 hover:shadow-emerald-300 transition-shadow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="lg:col-span-2 flex flex-col items-center text-center">
            <motion.img
              src="https://i.pravatar.cc/150?u=aarav"
              alt="Profile"
              className="w-44 h-44 rounded-full border-4 border-orange-400 shadow-xl"
              whileHover={{ scale: 1.15, rotate: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <h2 className="text-3xl font-bold text-gray-800 mt-4">Aarav Sharma</h2>
            <motion.p
              className="text-emerald-600 font-semibold text-xl"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Level 7: Sapling Guardian
            </motion.p>
          </div>

          <div className="lg:col-span-3 grid grid-cols-3 gap-6 items-center">
            {stats.map((stat, i) => (
              <motion.div key={i} whileHover={{ scale: 1.08 }} className="text-center">
                <CircularProgress
                  progress={stat.value}
                  size={120}
                  strokeWidth={10}
                  color={stat.color}
                />
                <p className="font-bold mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trophy Shelf */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 drop-shadow">🏆 Trophy Shelf</h2>
          <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-gray-200 flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
              {trophyColors.map((color, i) => (
                <motion.div
                  key={i}
                  whileHover={{ rotate: [0, 10, -10, 0], scale: 1.15 }}
                  className={`w-20 h-20 ${color} rounded-full shadow-lg mx-auto flex items-center justify-center`}
                >
                  <FaAward className="text-white" size={30} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Memories Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 drop-shadow">🌟 My Memories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {memories.map((mem, i) => (
              <Link key={i} to={mem.href}>
                <motion.div
                  className={`group relative flex flex-col items-center justify-center p-10 rounded-2xl shadow-2xl text-white bg-gradient-to-br ${mem.bg} hover:shadow-lg hover:shadow-emerald-400/50 transition-all`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -12, scale: 1.05 }}
                >
                  <motion.div
                    className="mb-4 p-6 rounded-full bg-white/20 backdrop-blur-md shadow-inner"
                    whileHover={{ rotate: 12, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 180 }}
                  >
                    {mem.icon}
                  </motion.div>
                  <p className="font-bold text-lg text-center drop-shadow-md">
                    {mem.title}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImpactPage;
