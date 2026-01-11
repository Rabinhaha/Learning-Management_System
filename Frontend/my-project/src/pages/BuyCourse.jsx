import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { getCourseById } from "../utils/api.jsx";

export default function BuyCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <p className="text-white">Loading...</p>;

  const handlePurchase = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}/buy`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("✅ Course purchased successfully!");
      navigate("/courses");
    } catch (err) {
      alert("❌ Purchase failed: " + err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-3xl font-bold mb-4">Buy Course</h1>
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <p className="mb-2 font-semibold">{course.title}</p>
          <p className="mb-2">{course.description}</p>
          <p className="mb-2">Instructor: {course.instructor?.name}</p>
          <p className="mb-2">Amount: ${course.amount}</p>
          <button
            onClick={handlePurchase}
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-white font-semibold mt-4"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
