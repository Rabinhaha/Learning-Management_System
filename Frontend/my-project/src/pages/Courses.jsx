import Sidebar from "../components/Sidebar.jsx";

export default function Courses() {
  // Dummy course data
  const courses = [
    { id: 1, title: "Web Development Basics", instructor: "John Doe" },
    { id: 2, title: "React for Beginners", instructor: "Jane Smith" },
    { id: 3, title: "Advanced Node.js", instructor: "David Kim" },
    { id: 4, title: "UI/UX Design Principles", instructor: "Emily Johnson" },
    { id: 5, title: "Database Management", instructor: "Michael Lee" },
    { id: 6, title: "Python for Data Science", instructor: "Sophia Brown" },
    { id: 7, title: "Mobile App Development", instructor: "Chris White" },
    { id: 8, title: "Cybersecurity Fundamentals", instructor: "Laura Green" },
    { id: 9, title: "Cloud Computing 101", instructor: "Robert Wilson" },
    { id: 10, title: "Machine Learning Basics", instructor: "Olivia Davis" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col text-white p-8 ml-64">
        <h1 className="text-4xl font-bold mb-2 text-center">Courses</h1>
        <p className="text-lg text-center mb-8">
          Browse and manage your courses here.
        </p>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:bg-gray-700 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-400 mb-4">
                Instructor: {course.instructor}
              </p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all duration-300">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
