import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken, logoutUser, getInstructorCourses } from "../utils/api";
import Sidebar from "../components/Sidebar.jsx";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      logoutUser();
      navigate("/");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchCourses = async () => {
      try {
        const data = await getInstructorCourses();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err.message);
      }
    };

    fetchCourses();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

        {user && (
          <p className="mb-4">
            Logged in as <span className="font-semibold">{user.email}</span> (
            {user.role})
          </p>
        )}

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">
            My Courses & Purchasers
          </h2>
          {courses.length === 0 ? (
            <p className="text-gray-400">
              You haven’t created any courses yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {courses.map((c) => (
                <li key={c._id} className="bg-gray-800 p-4 rounded">
                  <h3 className="text-xl font-semibold">
                    {c.title}{" "}
                    {c.purchasers?.length > 0 && (
                      <span className="ml-2 text-sm text-green-400">
                        👥 {c.purchasers.length} students
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-400">{c.description}</p>

                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">
                      Students who purchased:
                    </h4>
                    {c.purchasers?.length === 0 ? (
                      <p className="text-gray-400">No students yet.</p>
                    ) : (
                      <ul className="space-y-1">
                        {c.purchasers.map((p) => (
                          <li key={p._id} className="text-sm">
                            {p.name ?? "Unknown"} ({p.email ?? "No email"})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
