import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page imports
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Courses from "../pages/Courses";
import Auth from "../pages/Auth";
import CourseDetails from "../pages/CourseDetails";
import TeacherDashboard from "../pages/TeacherDashboard";
import AdminDashboard from "../pages/AdminDashboard";

// Teacher pages
import TeacherList from "../pages/TeacherList";
import AdminCreateTeacher from "../pages/AdminCreateTeacher";
import RegisterTeacher from "../pages/RegisterTeacher";

// Student pages
import StudentList from "../pages/StudentList"; // ✅ new student list page
import AdminCreateStudent from "../pages/AdminCreateStudent"; // ✅ new student create page
import RegisterStudent from "../pages/RegisterStudent"; // ✅ student registration form

// Utility / wrapper imports
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/register" element={<RegisterTeacher />} />
        <Route path="/register-student" element={<RegisterStudent />} />
        {/* Teacher routes */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        {/* Admin routes */}
        <Route path="/admin/teachers" element={<TeacherList />} />
        <Route path="/admin/create-teacher" element={<AdminCreateTeacher />} />
        <Route path="/admin/students" element={<StudentList />} />{" "}
        {/* ✅ student list */}
        <Route
          path="/admin/create-student"
          element={<AdminCreateStudent />}
        />{" "}
        {/* ✅ student create */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
