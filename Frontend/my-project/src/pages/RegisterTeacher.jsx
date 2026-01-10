import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { createTeacher } from "../utils/api.jsx"; // ✅ import API helper

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "", // ✅ required by schema
    masterCourse: "", // ✅ matches schema
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const teacher = await createTeacher(form); // ✅ call backend
      alert(`Teacher ${teacher.name} registered successfully!`);
      setForm({ name: "", email: "", password: "", masterCourse: "" }); // reset form
    } catch (err) {
      alert("Failed to register teacher: " + err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-8">Register Teacher</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-semibold">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          {/* Master Course */}
          <div>
            <label className="block mb-1 font-semibold">
              Master Course <span className="text-red-500">*</span>
            </label>
            <input
              name="masterCourse"
              value={form.masterCourse}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
