import React from "react";
import { motion } from "framer-motion";
import {
  FaPuzzlePiece,
  FaBookOpen,
  FaTrophy,
  FaPlay,
  FaUserGraduate,
} from "react-icons/fa";

// --- Animated Light Background Sub-Component ---
const AnimatedLightBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {/* Dynamic Gradient */}
    <div
      className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-white"
      style={{
        backgroundSize: "400% 400%",
        animation: "animate-gradient 25s ease infinite",
      }}
    />
    {/* Floating Leaves */}
    <div className="relative w-full h-full">
      <motion.div
        className="absolute top-[15%] left-[5%] text-emerald-300/20"
        style={{ animation: "animate-leaf-float 20s ease-in-out infinite alternate" }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17 8C8 10 5.9 16.17 3.82 21.32L5.71 22l1.95-4.22C9.53 14.26 13 12 17 12h1v-4h-1z"
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-[70%] left-[85%] text-emerald-300/20"
        style={{
          animation: "animate-leaf-float 25s ease-in-out infinite",
          animationDelay: "5s",
        }}
      >
        <svg width="150" height="150" viewBox="0 0 24 24" transform="scale(-1, 1)">
          <path
            fill="currentColor"
            d="M17 8C8 10 5.9 16.17 3.82 21.32L5.71 22l1.95-4.22C9.53 14.26 13 12 17 12h1v-4h-1z"
          />
        </svg>
      </motion.div>
    </div>
  </div>
);

const LearnPage: React.FC = () => {
  const learnData = {
    featuredModule: {
      title: "The Ganges: A River's Story",
      type: "Case Study",
      progress: 75,
      image: "/images/learn-dive-ganges.jpg",
      description:
        "An in-depth look at the challenges and triumphs of cleaning India's most sacred river.",
    },
    miniGames: [
      {
        title: "Waste Sorting Challenge",
        time: "5 min",
        image: "/images/learn-game-waste.jpg",
      },
      {
        title: "Energy Leak Hunter",
        time: "8 min",
        image: "/images/learn-game-energy.jpg",
      },
    ],
    deepDives: [
      {
        title: "Understanding Carbon Footprints",
        type: "Article",
        progress: 20,
        image: "/images/learn-dive-carbon.jpg",
      },
      {
        title: "Biodiversity of the Western Ghats",
        type: "Video Lesson",
        progress: 0,
        image: "/images/learn-dive-ghats.jpg",
      },
    ],
    quizzes: [
      { title: "Water Conservation Trivia", questions: 10 },
      { title: "Renewable Energy Battle", questions: 15 },
    ],
    expert: {
      name: "Dr. Aisha Khan",
      title: "Wildlife Biologist",
      image: "/images/learn-expert.jpg",
    },
  };

  return (
    <div className="relative min-h-screen p-6 pt-28">
      <AnimatedLightBackground />
      <div className="container mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            The Learning Hub
          </h1>
          <p className="text-lg text-gray-600">
            Knowledge is your greatest power. Sharpen it here.
          </p>
        </motion.div>

        {/* Featured Module */}
        <motion.div
          className="group mt-8 relative grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{
            boxShadow: "0 0 30px -5px rgba(16, 185, 129, 0.3)",
          }}
        >
          <div className="overflow-hidden rounded-xl shadow-lg">
            <motion.img
              src={learnData.featuredModule.image}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-bold text-emerald-600">FEATURED MODULE</p>
            <h2 className="text-4xl font-extrabold text-gray-800 mt-2">
              {learnData.featuredModule.title}
            </h2>
            <p className="text-gray-700 mt-4">
              {learnData.featuredModule.description}
            </p>
            <motion.button
              className="mt-6 bg-emerald-500 text-white font-bold py-3 px-6 rounded-full self-start flex items-center gap-2"
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaPlay /> Continue Module
            </motion.button>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-12">
            {/* Mini Games */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaPuzzlePiece className="text-blue-500" /> Learn by Playing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {learnData.miniGames.map((game, i) => (
                  <motion.div
                    key={game.title}
                    className="group relative rounded-2xl shadow-xl overflow-hidden"
                    whileHover={{
                      y: -10,
                      scale: 1.03,
                      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.2)",
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                  >
                    <motion.img
                      src={game.image}
                      className="w-full h-56 object-cover"
                      initial={{ scale: 1.15 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <span className="text-sm font-bold bg-white/30 px-2 py-1 rounded-full backdrop-blur-sm">
                        {game.time}
                      </span>
                      <h3 className="text-2xl font-extrabold mt-2">
                        {game.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Deep Dives */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <FaBookOpen className="text-purple-500" /> More Deep Dives
              </h2>
              <div className="space-y-4">
                {learnData.deepDives.map((dive, i) => (
                  <motion.div
                    key={dive.title}
                    className="group bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center gap-5 border border-gray-200"
                    whileHover={{
                      x: 5,
                      scale: 1.02,
                      boxShadow: "0 0 20px -5px rgba(192, 132, 252, 0.2)",
                    }}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <img
                      src={dive.image}
                      className="w-28 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-purple-600">
                        {dive.type}
                      </p>
                      <h4 className="text-lg font-bold text-gray-800">
                        {dive.title}
                      </h4>
                    </div>
                    <motion.button
                      className="bg-gray-200 group-hover:bg-purple-500 group-hover:text-white text-gray-800 font-bold py-2 px-4 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {dive.progress > 0 ? "Continue" : "Start"}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Section */}
          <div className="space-y-8 sticky top-24">
            {/* Quizzes */}
            <motion.div
              className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{
                boxShadow: "0 0 20px -5px rgba(249, 115, 22, 0.3)",
              }}
            >
              <h3 className="font-bold text-gray-800 text-xl flex items-center gap-3 mb-4">
                <FaTrophy className="text-orange-500" /> Knowledge Arena
              </h3>
              <ul className="space-y-3">
                {learnData.quizzes.map((quiz, i) => (
                  <motion.li
                    key={quiz.title}
                    className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-xl border border-gray-200 text-gray-800"
                    whileHover={{ scale: 1.03, x: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div>
                      <h4 className="font-semibold">{quiz.title}</h4>
                      <p className="text-sm text-gray-500">
                        {quiz.questions} Questions
                      </p>
                    </div>
                    <motion.button
                      className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Expert Section */}
            <motion.div
              className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{
                boxShadow: "0 0 20px -5px rgba(20, 184, 166, 0.3)",
              }}
            >
              <h3 className="font-bold text-gray-800 text-lg flex items-center justify-center gap-3 mb-4">
                <FaUserGraduate className="text-teal-500" /> Featured Expert
              </h3>
              <img
                src={learnData.expert.image}
                className="w-24 h-24 rounded-full mx-auto border-2 border-teal-400/50"
              />
              <h4 className="font-bold text-gray-800 mt-3">
                {learnData.expert.name}
              </h4>
              <p className="text-sm text-gray-600">{learnData.expert.title}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
