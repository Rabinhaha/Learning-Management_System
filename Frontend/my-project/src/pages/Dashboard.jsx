import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stats");
        const data = await res.json();
        console.log("Stats response:", data);
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const fallbackStats = {
    teachers: 0,
    students: 0,
    courses: 0,
    revenue: 0,
  };

  const displayStats = stats || fallbackStats;

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 bg-white text-black">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {loading && <p className="text-gray-600">Loading stats...</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Total Teachers" value={displayStats.teachers} />
          <StatCard label="Total Students" value={displayStats.students} />
          <StatCard label="Total Courses" value={displayStats.courses} />
          <StatCard
            label="Total Revenue"
            value={`NPR ${displayStats.revenue}`}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded shadow p-6 text-center border">
      <h2 className="text-lg font-semibold text-gray-600">{label}</h2>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  );
}
