import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken, logoutUser, createCourse } from "../utils/api";
import Sidebar from "../components/Sidebar.jsx";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

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
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const course = await createCourse({ title, description });
      setCourses([...courses, course]);
      setMessage(`Course "${course.title}" created successfully!`);
      setTitle("");
      setDescription("");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-3xl font-bold mb-6">Teacher Portal</h1>
        {user && (
          <p className="mb-4">
            Logged in as {user.email} ({user.role})
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
          >
            Create Course
          </button>
        </form>

        {message && <p className="mt-4">{message}</p>}

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
          <ul className="space-y-2">
            {courses.map((c) => (
              <li key={c._id} className="bg-gray-800 p-4 rounded">
                <h3 className="text-xl">{c.title}</h3>
                <p className="text-gray-400">{c.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
