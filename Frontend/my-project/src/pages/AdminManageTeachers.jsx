import Sidebar from "../components/Sidebar.jsx";
import { updateTeacherStatus } from "../utils/api";

const handleApprove = async (teacherId) => {
  try {
    await updateTeacherStatus(teacherId, "approved");
    alert("Teacher approved successfully!");
    // refresh teacher list
  } catch (err) {
    alert("Error approving teacher: " + err.message);
  }
};

export default function AdminManageTeachers() {
  // TODO: fetch teachers from backend
  const teachers = [
    { _id: "t1", name: "Alice", email: "alice@example.com", approved: true },
    { _id: "t2", name: "Bob", email: "bob@example.com", approved: false },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-3xl font-bold mb-6">Manage Teachers</h1>
        <ul className="space-y-2">
          {teachers.map((t) => (
            <li
              key={t._id}
              className="bg-gray-800 p-4 rounded flex justify-between"
            >
              <span>
                {t.name} ({t.email}) —{" "}
                {t.approved ? "✅ Approved" : "⏳ Pending"}
              </span>
              <button className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
