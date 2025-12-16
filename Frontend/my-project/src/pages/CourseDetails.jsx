import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../utils/api.jsx";
const BASE_URL = import.meta.env.VITE_API_URL;

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        Course not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-blue-300 p-8">
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <p className="text-lg mb-2">
        Instructor: {course.instructor?.name || course.instructor?.email}
      </p>
      <p className="text-gray-400 mb-4">Amount: ${course.amount}</p>
      <p className="text-gray-400 mb-4">{course.description}</p>

      {course.image && (
        <img
          src={`${BASE_URL}/uploads/${course.image}`}
          alt={course.title}
          className="w-full max-w-md rounded shadow-lg mt-4"
        />
      )}
    </div>
  );
}
