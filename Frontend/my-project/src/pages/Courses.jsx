import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function Courses() {
  const location = useLocation();
  console.log("Current route:", location.pathname); // Debug

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-4xl font-bold mb-4 text-left">Courses</h1>
        <div className="text-lg text-left space-y-4">
          <p>Browse and manage your courses here.</p>
          <p>
            Explore a variety of courses tailored to your learning goals. Enroll
            in new courses, track your progress, and access resources to enhance
            your education.
          </p>
        </div>
      </div>
    </div>
  );
}
