import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { getCourses } from "../utils/api.jsx";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-white items-center justify-center">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col text-white p-8 ml-64">
        <h1 className="text-4xl font-bold mb-2 text-center">Courses</h1>
        <p className="text-lg text-center mb-8">
          Browse and manage your courses here.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:bg-gray-700 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-400 mb-2">
                Instructor:{" "}
                {course.instructor?.name || course.instructor?.email}
              </p>
              <p className="text-gray-400 mb-4">Amount: ${course.amount}</p>
              <Link
                to={`/courses/${course._id}`}
                className="bg-gray-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-300 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
