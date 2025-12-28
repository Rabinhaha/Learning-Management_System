import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuthToken,
  logoutUser,
  createCourse,
  getInstructorCourses,
} from "../utils/api";
import Sidebar from "../components/Sidebar.jsx";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [idCardImage, setIdCardImage] = useState(null);
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

    // Fetch instructor courses
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (idCardImage) formData.append("idCardImage", idCardImage);

      // backend should save with approved=false initially
      const course = await createCourse(formData);
      setCourses([...courses, course]);
      setMessage(
        `Course "${course.title}" submitted successfully! Awaiting admin approval.`
      );
      setTitle("");
      setDescription("");
      setIdCardImage(null);
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setIdCardImage(e.target.files[0])}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
          >
            Submit Course
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
                {c.idCardImage && (
                  <img
                    src={c.idCardImage}
                    alt="ID Card"
                    className="w-32 h-auto mt-2 rounded"
                  />
                )}
                {!c.approved && (
                  <p className="text-yellow-400 mt-2">
                    Pending admin approval...
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
