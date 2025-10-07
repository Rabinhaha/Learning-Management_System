import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser, getAuthToken } from "../utils/api";
import Sidebar from "../components/Sidebar.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Current route:", location.pathname); // Debug
    const token = getAuthToken();
    console.log("Dashboard token:", token); // Debug
    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      navigate("/"); // Redirect to login
      return;
    }

    const storedUser = localStorage.getItem("user");
    console.log("Dashboard user:", storedUser); // Debug
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      setError("No user data found");
      logoutUser();
      setLoading(false);
      navigate("/");
    }
  }, [navigate, location.pathname]);

  if (loading)
    return (
      <div className="text-center text-white bg-gray-900 min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center bg-gray-900 min-h-screen flex items-center justify-center">
        {error}
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-4xl font-bold mb-4 text-left">About Us</h1>
        <div className="text-lg text-left space-y-4">
          <p>
            Welcome to our Learning Management System (LMS), a platform designed
            to empower students, instructors, and administrators with seamless
            access to educational resources. Our mission is to foster a dynamic
            learning environment that supports growth and innovation.
          </p>
          <p>
            Our LMS offers a wide range of features, including course
            management, user profiles, and interactive tools to enhance the
            learning experience. Whether you're a student exploring new subjects
            or an instructor creating engaging content, our platform is tailored
            to meet your needs.
          </p>
          <p>
            Built with cutting-edge technology, our system ensures reliability,
            security, and ease of use. We are committed to continuously
            improving our platform to provide the best possible experience for
            all users.
          </p>
          <p>
            {user
              ? `Logged in as ${user.email} (${user.role})`
              : "You have successfully logged in."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
