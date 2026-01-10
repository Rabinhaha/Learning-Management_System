import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { getTeachers, updateTeacherStatus } from "../utils/api.jsx";

export default function TeacherListOnly() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (err) {
        setError(err.message || "Failed to load teachers");
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateTeacherStatus(id, "approved");
      setTeachers((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: "approved" } : t))
      );
    } catch (err) {
      alert("Failed to approve teacher");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Teacher List</h1>
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white font-semibold"
          >
            Register
          </button>
        </div>

        <p className="mb-4 text-gray-400">Total Records ({teachers.length})</p>

        {loading ? (
          <p>Loading teachers...</p>
        ) : teachers.length === 0 ? (
          <p className="text-gray-400">No teachers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-left text-sm uppercase text-gray-300">
                <tr>
                  <th className="px-4 py-2">S.N.</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Master Course</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">ID Card</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {teachers.map((teacher, index) => (
                  <tr
                    key={teacher._id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{teacher.name}</td>
                    <td className="px-4 py-2">{teacher.email}</td>
                    <td className="px-4 py-2">{teacher.masterCourse}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          teacher.status === "approved"
                            ? "bg-green-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {teacher.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {teacher.idCardImagePath ? (
                        <img
                          src={`http://localhost:5000/uploads/${teacher.idCardImagePath}`}
                          alt="ID Card"
                          className="h-12 w-12 object-cover rounded border border-gray-600"
                        />
                      ) : (
                        <span className="text-gray-400">No ID card</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {teacher.status !== "approved" && (
                        <button
                          onClick={() => handleApprove(teacher._id)}
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
