import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { getStudents, updateStudentStatus } from "../utils/api.jsx"; // ✅ new helpers

export default function StudentListOnly() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        setError(err.message || "Failed to load students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateStudentStatus(id, "approved");
      setStudents((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: "approved" } : s))
      );
    } catch (err) {
      alert("Failed to approve student");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Student List</h1>
          <button
            onClick={() => navigate("/register-student")}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white font-semibold"
          >
            Register Student
          </button>
        </div>

        <p className="mb-4 text-gray-400">Total Records ({students.length})</p>

        {loading ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-gray-400">No students found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-left text-sm uppercase text-gray-300">
                <tr>
                  <th className="px-4 py-2">S.N.</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {students.map((student, index) => (
                  <tr
                    key={student._id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.email}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          student.status === "approved"
                            ? "bg-green-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {student.status !== "approved" && (
                        <button
                          onClick={() => handleApprove(student._id)}
                          className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded text-xs"
                        >
                          Approve
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
