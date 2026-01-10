import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Sidebar from "../components/Sidebar.jsx"; // ✅ import your reusable sidebar

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  // Dummy data — replace with API later
  const stats = {
    teachers: 42,
    students: 320,
    courses: 18,
    revenue: "NPR 1,200,000",
    teacherGender: { male: 30, female: 12 },
    studentGender: { male: 200, female: 120 },
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 ml-64 p-8 bg-white text-black">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Top stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Total Teachers" value={stats.teachers} />
          <StatCard label="Total Students" value={stats.students} />
          <StatCard label="Total Courses" value={stats.courses} />
          <StatCard label="Total Revenue" value={stats.revenue} />
        </div>

        {/* Gender charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GenderPieChart
            title="Teacher Gender"
            male={stats.teacherGender.male}
            female={stats.teacherGender.female}
          />
          <GenderPieChart
            title="Student Gender"
            male={stats.studentGender.male}
            female={stats.studentGender.female}
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

function GenderPieChart({ title, male, female }) {
  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [male, female],
        backgroundColor: ["#3b82f6", "#ec4899"], // blue & pink
        hoverBackgroundColor: ["#2563eb", "#db2777"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded shadow p-6 border">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">{title}</h2>
      <Pie data={data} options={options} />
    </div>
  );
}
