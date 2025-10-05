// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center">
        Welcome to Dashboard 🎉
      </h1>
    </div>
  );
}

export default Dashboard;
