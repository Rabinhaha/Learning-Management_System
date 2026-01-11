import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/api";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { role: "guest" };

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem("user"); // clear user
    navigate("/");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/courses", label: "Courses", icon: "📚" },
    { path: "/profile", label: "Profile", icon: "👤" },
  ];

  // ✅ Only keep the admin links you want
  const adminItems = [
    { path: "/admin/create-teacher", label: "Create Teacher", icon: "👨‍🏫" },
    { path: "/admin/create-student", label: "Create Student", icon: "🎓" },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-black text-white flex flex-col p-4 z-10">
      <h2 className="text-2xl font-bold mb-6">LMS</h2>
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

          {user.role === "admin" &&
            adminItems.map((item) => (
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
