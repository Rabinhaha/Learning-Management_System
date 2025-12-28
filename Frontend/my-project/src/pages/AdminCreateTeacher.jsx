import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function AdminCreateTeacher() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [masterCourse, setMasterCourse] = useState("");
  const [idCardImage, setIdCardImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call backend API to create teacher with approved=false
    console.log({ name, email, masterCourse, idCardImage });
    alert("Teacher created. Awaiting admin approval.");
    setName("");
    setEmail("");
    setMasterCourse("");
    setIdCardImage(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64 text-white">
        <h1 className="text-3xl font-bold mb-6">Create Teacher</h1>
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
          <input
            type="text"
            placeholder="Master Course"
            value={masterCourse}
            onChange={(e) => setMasterCourse(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setIdCardImage(e.target.files[0])}
            className="w-full p-2 rounded bg-gray-700"
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
