import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";

export default function Auth() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // 👈 new state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      alert("Login successful!");

      const user = data.user;
      if (user?.role === "teacher") {
        navigate("/teacher");
      } else if (user?.role === "student") {
        navigate("/dashboard");
      } else if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
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

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // 👈 toggle type
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border rounded text-white pr-16"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // 👈 toggle state
              className="absolute right-2 top-2 text-sm bg-gray-700 px-2 py-1 rounded"
            >
              {showPassword ? "Hide" : "View"}
            </button>
          </div>

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
