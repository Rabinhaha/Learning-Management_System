import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { getCourses } from "../utils/api.jsx";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        console.log("Courses fetched:", data); // 🔎 Debug
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Courses</h1>

          {/* Only teachers can add courses */}
          {user?.role === "teacher" && (
            <button
              onClick={() => navigate("/teacher/create-course")}
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold shadow-md"
            >
              + Add Course
            </button>
          )}
        </div>

        <p className="mb-4 text-gray-400">Total Records ({courses.length})</p>

        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-400">No courses found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-left text-sm uppercase text-gray-300">
                <tr>
                  <th className="px-4 py-2">S.N.</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Instructor</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {courses.map((course, index) => (
                  <tr
                    key={course._id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{course.title}</td>
                    <td className="px-4 py-2">
                      {course.instructor?.name || course.instructor?.email}
                    </td>
                    <td className="px-4 py-2">${course.amount}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <Link
                        to={`/courses/${course._id}`}
                        className="bg-gray-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs"
                      >
                        View
                      </Link>

                      {/* Only students can buy courses */}
                      {user?.role === "student" && (
                        <button
                          onClick={() => navigate(`/courses/${course._id}/buy`)}
                          className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Buy
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
