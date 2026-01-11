import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../utils/api.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function TeacherCreateCourse() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  // 🚫 Block unapproved teachers
  if (user.role === "teacher" && user.status !== "approved") {
    return (
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        <div className="flex-1 p-8 ml-64 text-white flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-400">
            Your profile is not approved yet. Please wait for admin approval.
          </p>
        </div>
      </div>
    );
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("amount", amount);
      if (image) formData.append("image", image);

      const course = await createCourse(formData);
      setMessage(`✅ Course "${course.title}" created successfully!`);
      navigate(`/courses/${course._id}`);
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Create Course</h1>
          <button
            onClick={() => navigate("/courses")}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold shadow-md"
          >
            ← Back to Courses
          </button>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-2xl">
          {message && (
            <div
              className={`mb-4 p-3 rounded ${
                message.startsWith("✅")
                  ? "bg-green-700 text-green-200"
                  : "bg-red-700 text-red-200"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold">Course Title</label>
              <input
                type="text"
                placeholder="Enter course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Description</label>
              <textarea
                placeholder="Enter course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Amount ($)</label>
              <input
                type="number"
                placeholder="Enter course fee"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Course Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-3 rounded bg-gray-700 text-white cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 px-4 py-3 rounded-lg font-bold shadow-md transition-all"
            >
              Create Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
