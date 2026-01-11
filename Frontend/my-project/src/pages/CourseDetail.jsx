import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../utils/api.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        console.log("Fetched course:", data); // 🔎 Debug
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p className="text-white">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <p className="mb-4 text-gray-300">{course.description}</p>

          <p className="mb-2">
            <span className="font-semibold">Instructor:</span>{" "}
            {course.instructor?.name || course.instructor?.email}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Amount:</span> {course.amount}
          </p>

          {/* ✅ Show uploaded image from Cloudinary */}
          {course.imageUrl && (
            <img
              src={course.imageUrl}
              alt={course.title}
              className="mt-4 w-64 h-40 object-cover rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
}
