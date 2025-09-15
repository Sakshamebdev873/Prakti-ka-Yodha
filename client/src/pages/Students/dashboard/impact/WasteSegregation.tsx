import React, { useRef, useState } from "react";
import { FaRecycle, FaTrash, FaLeaf, FaTint } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";

// Waste bin definitions
const bins = [
  {
    label: "Biodegradable",
    gradient: "from-green-400 via-emerald-500 to-green-700",
    icon: <FaLeaf className="text-5xl text-white" />,
    href: "biodegradable", // ✅ use relative path
  },
  {
    label: "Recyclable",
    gradient: "from-sky-400 via-blue-500 to-cyan-600",
    icon: <FaRecycle className="text-5xl text-white" />,
    href: "recyclable",
  },
  {
    label: "Non-Recyclable",
    gradient: "from-orange-400 via-red-500 to-pink-600",
    icon: <FaTrash className="text-5xl text-white" />,
    href: "non_recyclable",
  },
];

export default function WasteSegregationPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScanClick = () => {
    fileInputRef.current?.click();
  };

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
            Waste Segregation <span className="text-green-600">🌱</span>
          </h1>
          <span className="px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold shadow">
            Points:{" "}
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="inline-block"
            >
              1200
            </motion.span>
          </span>
        </motion.header>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <input
            type="text"
            className="w-full p-4 rounded-xl border border-emerald-400 bg-white/80 backdrop-blur focus:outline-none shadow-md"
            placeholder="🔍 Search waste items (e.g., Plastic Bottle)"
          />
        </motion.div>

        {/* Waste Bins */}
        <motion.section
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {bins.map((bin, i) => (
            <Link key={i} to={bin.href} className="no-underline">
              <motion.div
                whileHover={{ y: -12, scale: 1.05 }}
                className={`flex flex-col items-center justify-center p-10 rounded-2xl shadow-2xl text-white bg-gradient-to-br ${bin.gradient} hover:shadow-lg hover:shadow-emerald-400/50 transition-all`}
              >
                <motion.div
                  className="mb-4 p-6 rounded-full bg-white/20 backdrop-blur-md shadow-inner"
                  whileHover={{ rotate: 12, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 180 }}
                >
                  {bin.icon}
                </motion.div>
                <span className="font-bold text-lg drop-shadow-md">
                  {bin.label}
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.section>

        {/* Scan/Upload Action */}
        <motion.section
          className="mt-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleScanClick}
            className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold shadow-lg hover:shadow-emerald-400/50 transition"
          >
            📸 Scan Waste or Upload Photo
          </motion.button>

          <span className="text-gray-600 text-sm italic">
            Earn points by correctly sorting your waste!
          </span>

          {preview && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <img
                src={preview}
                alt="Uploaded Waste"
                className="w-64 h-64 object-cover rounded-xl border-4 border-emerald-400 shadow-lg"
              />
              <p className="text-gray-700 mt-2 text-center font-semibold">
                Your uploaded waste item
              </p>
            </motion.div>
          )}
        </motion.section>

        {/* Motivational Line */}
        <motion.section
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="italic opacity-80 text-lg">
            “Recycle today for a greener tomorrow!”
          </p>
        </motion.section>

        {/* ✅ Nested Routes Render Here */}
        <div className="mt-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
