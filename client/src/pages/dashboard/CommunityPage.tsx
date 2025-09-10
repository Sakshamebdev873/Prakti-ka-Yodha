import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaTrophy,
  FaCalendarAlt,
  FaHeart,
  FaComment,
  FaBullhorn,
  FaLeaf,
  FaCrown,
  FaFire,
} from "react-icons/fa";

// --- MOCK DATA ---
const topPlayers = [
  { name: "Aarav", score: 980, avatar: "/images/avatar1.png" },
  { name: "Anjali", score: 920, avatar: "/images/avatar2.png" },
  { name: "Rohan", score: 870, avatar: "/images/avatar3.png" },
];

const postsData = [
  {
    id: 1,
    author: "Anjali M.",
    avatar: "/images/avatar2.png",
    content:
      "Our Eco-Club just finished the campus clean-up drive! We collected 15kg of plastic. Feeling so proud! 🌱",
    image: "/images/community-cleanup.jpg",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    author: "Rohan K.",
    avatar: "/images/avatar3.png",
    content:
      "Just hit a 30-day streak on daily missions! The key is consistency. #EcoWarrior",
    image: "/images/forest-path.jpg",
    likes: 25,
    comments: 6,
  },
];

const eventsData = [
  {
    name: "City-Wide Tree Plantation Drive",
    date: "Oct 22",
    location: "City Park",
  },
  {
    name: "Webinar: The Future of Renewable Energy",
    date: "Nov 5",
    location: "Online",
  },
];

const squadOnline = [
  { name: "Meera", avatar: "/images/avatar4.png" },
  { name: "Kabir", avatar: "/images/avatar5.png" },
  { name: "Ishita", avatar: "/images/avatar6.png" },
];

const floatingIcons = [
  { Icon: FaLeaf, color: "text-green-400" },
  { Icon: FaFire, color: "text-orange-400" },
  { Icon: FaCrown, color: "text-yellow-400" },
];

const CommunityPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200 p-6 pt-28 overflow-hidden">
      {/* Floating background icons */}
      {floatingIcons.map(({ Icon, color }, i) => (
        <motion.div
          key={i}
          className={`absolute text-4xl opacity-30 ${color}`}
          initial={{ y: -50, x: Math.random() * window.innerWidth }}
          animate={{
            y: [0, -20, 0],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` }}
        >
          <Icon />
        </motion.div>
      ))}

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2 drop-shadow">
            The Yoddha Outpost ⚔️
          </h1>
          <p className="text-lg text-gray-600">
            Connect with your squadron, challenge rivals, and share your eco victories.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Community Feed */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FaBullhorn className="text-orange-500" /> Community Feed
            </h2>

            {postsData.map((post, i) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-2xl shadow-xl border overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="overflow-hidden h-64">
                  <motion.img
                    src={post.image}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={post.avatar}
                      className="w-12 h-12 rounded-full border-2 border-emerald-400"
                    />
                    <p className="font-bold text-gray-800">{post.author}</p>
                  </div>
                  <p className="text-gray-600">{post.content}</p>
                  <div className="flex gap-6 mt-4">
                    <motion.button
                      className="flex items-center gap-2 text-pink-600"
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaHeart /> {post.likes}
                    </motion.button>
                    <motion.button
                      className="flex items-center gap-2 text-blue-600"
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaComment /> {post.comments}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8 sticky top-24">
            {/* Leaderboard */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 className="font-bold text-gray-800 text-lg flex items-center gap-3 mb-4">
                <FaTrophy className="text-yellow-500" /> Leaderboard
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                {topPlayers.map((player, idx) => (
                  <motion.div
                    key={player.name}
                    whileHover={{ y: -6, scale: 1.05 }}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={player.avatar}
                      className={`w-16 h-16 rounded-full border-4 ${
                        idx === 0
                          ? "border-yellow-400"
                          : idx === 1
                          ? "border-gray-400"
                          : "border-orange-400"
                      }`}
                    />
                    <p className="font-bold text-gray-800 mt-2">{player.name}</p>
                    <p className="text-sm text-gray-500">{player.score} pts</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Events */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-bold text-gray-800 text-lg flex items-center gap-3 mb-4">
                <FaCalendarAlt className="text-blue-500" /> Upcoming Events
              </h3>
              {eventsData.map((event, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 mt-3"
                  whileHover={{ x: 6 }}
                >
                  <div className="bg-blue-100 text-blue-600 font-bold p-3 rounded-lg text-center shadow">
                    <p className="text-xs">
                      {event.date.split(" ")[0].toUpperCase()}
                    </p>
                    <p className="text-xl">{event.date.split(" ")[1]}</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{event.name}</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Active Squad */}
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-bold text-gray-800 text-lg flex items-center gap-3 mb-4">
                <FaUsers className="text-green-500" /> Active Squad
              </h3>
              <div className="flex -space-x-4">
                {squadOnline.map((user, i) => (
                  <motion.img
                    key={i}
                    src={user.avatar}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ rotate: 10 }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                {squadOnline.length} warriors online now
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
