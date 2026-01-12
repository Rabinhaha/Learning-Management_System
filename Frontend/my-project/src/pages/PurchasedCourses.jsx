import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function PurchasedStudents() {
  const { id } = useParams();
  const [purchasers, setPurchasers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasers = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/courses/${id}/purchasers`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setPurchasers(data.purchasers || []);
      } catch (err) {
        console.error("Error fetching purchasers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasers();
  }, [id]);

  if (loading) return <p className="p-6 text-white">Loading students...</p>;

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-2xl font-bold mb-4">
          Students who purchased this course
        </h1>
        {purchasers.length === 0 ? (
          <p>No students have purchased this course yet.</p>
        ) : (
          <ul className="space-y-2">
            {purchasers.map((p) => (
              <li key={p._id} className="bg-gray-800 p-3 rounded">
                {p.name ?? "Unknown"} ({p.email ?? "No email"})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
