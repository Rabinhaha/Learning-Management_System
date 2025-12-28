import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function AdminPendingApprovals() {
  const [pendingCourses, setPendingCourses] = useState([]);

  useEffect(() => {
    // TODO: fetch pending courses from backend
    setPendingCourses([
      { _id: "1", title: "Math 101", teacher: "Alice", approved: false },
      { _id: "2", title: "Physics Basics", teacher: "Bob", approved: false },
    ]);
  }, []);

  const handleApprove = (id) => {
    // TODO: call backend approveCourse(id)
    setPendingCourses(
      pendingCourses.map((c) => (c._id === id ? { ...c, approved: true } : c))
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-3xl font-bold mb-6">Pending Approvals</h1>
        <ul className="space-y-2">
          {pendingCourses.map((c) => (
            <li
              key={c._id}
              className="bg-gray-800 p-4 rounded flex justify-between"
            >
              <span>
                {c.title} — Teacher: {c.teacher}{" "}
                {c.approved ? "✅ Approved" : "⏳ Pending"}
              </span>
              {!c.approved && (
                <button
                  onClick={() => handleApprove(c._id)}
                  className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded"
                >
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
