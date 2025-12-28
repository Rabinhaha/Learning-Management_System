import Sidebar from "../components/Sidebar.jsx";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <Outlet /> {/* nested admin pages render here */}
      </div>
    </div>
  );
}
