import Sidebar from "../components/Sidebar.jsx";

export default function Courses() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center text-white p-8 ml-64">
        <h1 className="text-4xl font-bold mb-4">Courses</h1>
        <p className="text-lg">Browse and manage your courses here.</p>
      </div>
    </div>
  );
}
