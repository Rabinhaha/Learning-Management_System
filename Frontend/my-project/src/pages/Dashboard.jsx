import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/api";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setError("No user data found");
      logoutUser();
      navigate("/");
    }
  }, [navigate]);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Dashboard 🎉{user ? `, ${user.name}` : ""}
      </h1>
      <p className="text-lg mb-6">
        {user
          ? `Logged in as ${user.email} (${user.role})`
          : "You have successfully logged in."}
      </p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold"
      >
        Logout
      </button>
    </div>
  );

  function handleLogout() {
    logoutUser();
    navigate("/");
  }
}

export default Dashboard;
