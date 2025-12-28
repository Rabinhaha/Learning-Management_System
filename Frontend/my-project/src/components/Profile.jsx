import Sidebar from "../components/Sidebar.jsx";
import { useState, useEffect } from "react";
import { submitTeacherProfile, updateUserProfile } from "../utils/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    masterCourse: "",
    idCardImage: null,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setForm({
        name: parsed.name || "",
        email: parsed.email || "",
        masterCourse: parsed.masterCourse || "",
        idCardImage: null,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setForm({ ...form, [name]: files[0] }); // store File object
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    // Build FormData
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);

    if (user.role === "teacher") {
      formData.append("masterCourse", form.masterCourse);
      if (form.idCardImage) {
        formData.append("idCardImage", form.idCardImage);
      }
    }

    // Debug: log what’s being sent
    console.log("FormData entries:", [...formData.entries()]);

    try {
      if (user.role === "teacher") {
        await submitTeacherProfile(formData); // backend saves with status="pending"
        setMessage("Teacher profile submitted. Awaiting admin approval.");
      } else {
        await updateUserProfile(formData); // generic update for students/admin
        setMessage("Profile updated successfully.");
      }
    } catch (err) {
      console.error("Profile submit error:", err);
      setMessage("Error submitting profile.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-start text-white p-8 ml-64">
        <h1 className="text-4xl font-bold mb-4">Profile</h1>
        {user ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-gray-800 p-6 rounded w-full max-w-md"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700"
              required
            />

            {/* Teacher-only fields */}
            {user.role === "teacher" && (
              <>
                <input
                  type="text"
                  name="masterCourse"
                  placeholder="Master Course"
                  value={form.masterCourse}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700"
                  required
                />
                <input
                  type="file"
                  name="idCardImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700"
                />
              </>
            )}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded w-full"
            >
              {user.role === "teacher"
                ? "Submit for Approval"
                : "Update Profile"}
            </button>
            {message && <p className="mt-4 text-yellow-400">{message}</p>}
          </form>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}
