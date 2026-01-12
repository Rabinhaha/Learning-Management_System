import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Courses from "./pages/Courses";
import Profile from "./components/Profile";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherCreateCourse from "./pages/TeacherCreateCourse";
import AdminDashboard from "./pages/AdminDashboard";
import CourseDetail from "./pages/CourseDetail.jsx";
import BuyCourse from "./pages/BuyCourse.jsx";
import PurchasedCourses from "./pages/PurchasedCourses.jsx"; // ✅ correct file
import MyPurchases from "./pages/MyPurchases.jsx"; // ✅ student purchases page

// new admin pages
import AdminCreateTeacher from "./pages/AdminCreateTeacher";
import AdminCreateStudent from "./pages/AdminCreateStudent";

import Register from "./pages/RegisterTeacher";
import RegisterStudent from "./pages/RegisterStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Auth />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Teacher portal */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/create-course"
          element={
            <ProtectedRoute role="teacher">
              <TeacherCreateCourse />
            </ProtectedRoute>
          }
        />

        {/* Admin portal */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-teacher"
          element={
            <ProtectedRoute role="admin">
              <AdminCreateTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-student"
          element={
            <ProtectedRoute role="admin">
              <AdminCreateStudent />
            </ProtectedRoute>
          }
        />

        {/* Registration pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/register-student" element={<RegisterStudent />} />

        {/* Course detail */}
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:id/buy" element={<BuyCourse />} />
        <Route path="/courses/:id/purchasers" element={<PurchasedCourses />} />

        {/* Student purchases */}
        <Route
          path="/purchased-courses"
          element={
            <ProtectedRoute role="student">
              <MyPurchases />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
