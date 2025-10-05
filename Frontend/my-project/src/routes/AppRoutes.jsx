import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Courses from "../pages/Courses";
import Auth from "../pages/Auth"; // ✅

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/auth" element={<Auth />} /> {/* ✅ */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
