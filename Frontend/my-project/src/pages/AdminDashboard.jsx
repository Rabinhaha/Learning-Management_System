import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="text-white">Loading stats...</p>;

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <StatCard label="Teachers" value={stats.teachers} />
          <StatCard label="Students" value={stats.students} />
          <StatCard label="Courses" value={stats.courses} />
          <StatCard label="Revenue" value={`NPR ${stats.revenue}`} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
