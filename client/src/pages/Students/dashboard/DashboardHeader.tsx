import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaSignOutAlt, FaUserCircle, FaCog } from 'react-icons/fa';

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => { navigate('/'); };
  const user = { name: "Aarav", avatar: "https://i.pravatar.cc/40?u=aarav", prakritiPoints: 1250 };

  return (
    <motion.header /* ... same as before ... */ >
      <nav className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <a href="/student" className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <span className="text-2xl text-emerald-600">🍃</span><span className="text-orange-500">Yoddha</span>
        </a>
        <div className="hidden md:flex items-center space-x-1 bg-gray-100 p-1 rounded-full">
            <NavLink to="/student/dashboard" end className={({ isActive }) => `px-4 py-1.5 rounded-full font-semibold transition-colors ${isActive ? 'bg-white shadow' : 'text-gray-600 hover:text-gray-200'}`}>Dashboard</NavLink>
            <NavLink to="/student/dashboard/missions" className={({ isActive }) => `px-4 py-1.5 rounded-full font-semibold transition-colors ${isActive ? 'bg-white shadow' : 'text-gray-600 hover:text-gray-200'}`}>Missions</NavLink>
            <NavLink to="/student/dashboard/learn" className={({ isActive }) => `px-4 py-1.5 rounded-full font-semibold transition-colors ${isActive ? 'bg-white shadow' : 'text-gray-600 hover:text-gray-200'}`}>Learn</NavLink>
            <NavLink to="/student/dashboard/community" className={({ isActive }) => `px-4 py-1.5 rounded-full font-semibold transition-colors ${isActive ? 'bg-white shadow' : 'text-gray-600 hover:text-gray-200'}`}>Community</NavLink>
            <NavLink to="/student/dashboard/impact" className={({ isActive }) => `px-4 py-1.5 rounded-full font-semibold transition-colors ${isActive ? 'bg-white shadow' : 'text-gray-600 hover:text-gray-200'}`}>My Impact</NavLink>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5">
            <span className="text-emerald-600 font-bold">🌿</span><span className="font-semibold text-gray-700">{user.prakritiPoints} PP</span>
          </div>
          <div className="group relative">
            <motion.img 
              src={user.avatar} alt={user.name} 
              className="w-10 h-10 rounded-full border-2 border-orange-400 cursor-pointer" 
              whileHover={{ scale: 1.1 }}
            />
            {/* --- FIX: The dropdown now uses group-hover to become visible --- */}
            <motion.div 
                className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 origin-top-right
                           opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
                           transition-opacity duration-200"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.1 }}
            >
                <div className="p-3 border-b border-gray-200">
                    <p className="font-bold text-gray-800 truncate">{user.name}</p>
                    <p className="text-sm text-gray-500">Level 7 Guardian</p>
                </div>
                <div className="p-1">
                    <a href="#" className="w-full text-left flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"><FaUserCircle /> My Profile</a>
                    <a href="#" className="w-full text-left flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"><FaCog /> Settings</a>
                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors font-semibold">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </motion.div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};
export default DashboardHeader;