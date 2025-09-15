import { Link, useLocation } from "react-router-dom";
import { FaHome, FaClipboardList, FaUsers, FaMedal, FaCalendarAlt } from "react-icons/fa";

export default function TeacherNavbar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/teacher/dashboard", icon: <FaHome /> },
    { name: "Quizzes", path: "/teacher/quizzes", icon: <FaClipboardList /> },
    { name: "Students", path: "/teacher/students", icon: <FaUsers /> },
    { name: "Certificates", path: "/teacher/certificates", icon: <FaMedal /> },
    { name: "Events", path: "/teacher/events", icon: <FaCalendarAlt /> },
  ];

  return (
    <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 text-2xl font-bold">
            EcoLearn <span className="text-yellow-300">Teacher</span>
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
                  location.pathname === item.path
                    ? "bg-green-500 shadow"
                    : "hover:bg-green-600"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
