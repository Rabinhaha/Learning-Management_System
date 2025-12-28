import Sidebar from "../components/Sidebar.jsx";

export default function AdminManageStudents() {
  // TODO: fetch students from backend
  const students = [
    { _id: "s1", name: "Charlie", email: "charlie@example.com" },
    { _id: "s2", name: "Dana", email: "dana@example.com" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-3xl font-bold mb-6">Manage Students</h1>
        <ul className="space-y-2">
          {students.map((s) => (
            <li
              key={s._id}
              className="bg-gray-800 p-4 rounded flex justify-between"
            >
              <span>
                {s.name} ({s.email})
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
