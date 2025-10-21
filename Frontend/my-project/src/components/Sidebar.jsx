import { NavLink } from "react-router-dom";
import { logoutUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const navItems = [
    { path: "/Dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/Courses", label: "Courses", icon: "📚" },
    { path: "/Profile", label: "Profile", icon: "👤" },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col p-4 z-10">
      <h2 className="text-2xl font-bold mb-6">Lms</h2>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md hover:bg-gray-700 ${
                    isActive ? "bg-blue-600 text-white" : ""
                  }`
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto p-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold"
      >
        Logout
      </button>
    </aside>
  );
}
