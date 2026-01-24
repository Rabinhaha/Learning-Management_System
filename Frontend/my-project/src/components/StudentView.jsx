import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import { getStudentById } from "../utils/api.jsx"; // ✅ make sure this helper exists

export default function StudentView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (err) {
        setError(err.message || "Failed to load student");
      }
    };
    fetchStudent();
  }, [id]);

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        <div className="flex-1 p-8 ml-64 text-white">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => navigate("/admin")}
            className="mt-4 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        <div className="flex-1 p-8 ml-64 text-white">
          <p>Loading student...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-3xl font-bold mb-6">Student Details</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Status:</strong> {student.status}
          </p>
          <p>
            <strong>Courses Purchased:</strong> {student.courses?.length || 0}
          </p>
        </div>
        <button
          onClick={() => navigate("/admin")}
          className="mt-6 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold"
        >
          ← Back to Admin Dashboard
        </button>
      </div>
    </div>
  );
}
