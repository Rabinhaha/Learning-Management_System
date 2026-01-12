import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function MyPurchases() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/courses/my/purchases",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch purchases");

        const data = await res.json();
        setCourses(data || []);
      } catch (err) {
        console.error("Error fetching purchases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (loading) return <p className="p-6 text-white">Loading purchases...</p>;

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-2xl font-bold mb-4">My Purchased Courses</h1>
        {courses.length === 0 ? (
          <p>You haven’t purchased any courses yet.</p>
        ) : (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li key={course._id} className="bg-gray-800 p-4 rounded">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p>{course.description}</p>
                <p>Instructor: {course.instructor?.name}</p>
                <p>Amount: ${course.amount}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
