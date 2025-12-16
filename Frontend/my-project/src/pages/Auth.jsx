import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";

export default function Auth() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      console.log("Auth response:", data);
      console.log("Token in localStorage:", localStorage.getItem("token"));
      console.log("User in localStorage:", localStorage.getItem("user"));
      alert("Login successful!");

      // Navigate based on role
      const user = data.user;
      if (user?.role === "teacher") {
        navigate("/teacher");
      } else if (user?.role === "student") {
        navigate("/dashboard"); // student portal
      } else if (user?.role === "admin") {
        navigate("/admin"); // future admin portal
      } else {
        navigate("/"); // fallback
      }
    } catch (err) {
      console.error("Auth error:", err.message);
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-md text-white">
        <h1 className="text-2xl font-bold text-center mb-6">Teacher Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded text-white"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
