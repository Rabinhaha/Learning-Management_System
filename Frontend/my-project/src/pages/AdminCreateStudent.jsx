import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function AdminCreateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call backend API to create student
    console.log({ name, email });
    alert("Student created successfully!");
    setName("");
    setEmail("");
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-3xl font-bold mb-6">Create Student</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-800 p-6 rounded"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
