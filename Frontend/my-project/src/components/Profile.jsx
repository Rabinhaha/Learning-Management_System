import Sidebar from "../components/Sidebar.jsx";
import { useState, useEffect } from "react";
import { getAuthToken } from "../utils/api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center text-white p-8 ml-64">
        <h1 className="text-4xl font-bold mb-4">Profile</h1>
        {user ? (
          <div className="text-lg">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}
