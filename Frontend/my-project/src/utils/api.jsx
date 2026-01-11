const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
console.log("BASE_URL:", BASE_URL);

// ------------------------
// Token helpers
// ------------------------
export const setAuthToken = (token) => localStorage.setItem("token", token);
export const getAuthToken = () => localStorage.getItem("token");
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ------------------------
// Core request function
// ------------------------
const request = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Only set Content-Type for JSON bodies
  if (
    !(options.body instanceof FormData) &&
    options.method &&
    options.method !== "GET"
  ) {
    headers["Content-Type"] = "application/json";
  }

  const url = `${BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\/+/, "")}`;
  console.log("🔗 Request URL:", url);
  console.log("📦 Request Options:", { ...options, headers });

  const res = await fetch(url, { ...options, headers });

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    console.error("❌ API Error:", res.status, data.message || data.errors);
    throw new Error(
      data.message || data.errors?.join(", ") || "Something went wrong"
    );
  }

  return data;
};

// =======================
// Auth APIs
// =======================
export const register = async (form) => {
  const data = await request("api/auth/register", {
    method: "POST",
    body: JSON.stringify(form),
  });

  if (data.token) setAuthToken(data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const login = async (credentials) => {
  const data = await request("api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (!data.token) throw new Error("Login failed: no token received");

  setAuthToken(data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const getProfile = async () => request("api/auth/me");

// =======================
// Course APIs
// =======================

export const getCourses = async () => request("api/courses", { method: "GET" });

export const getCourseById = async (id) =>
  request(`api/courses/${id}`, { method: "GET" });

export const createCourse = async (formData) =>
  request("api/courses", { method: "POST", body: formData });

// =======================
// Teacher APIs
// =======================
export const getInstructorCourses = async () =>
  request("api/courses/instructor", { method: "GET" });

export const submitTeacherProfile = async (formData) =>
  request("api/user/teacher/profile", {
    method: "POST",
    body: formData, // ✅ raw FormData
  });

export const updateUserProfile = async (formData) =>
  request("api/user/profile", {
    method: "PUT",
    body: formData, // ✅ raw FormData
  });

// =======================
// Admin APIs
// =======================
export const getUsers = async () =>
  request("api/admin/users", { method: "GET" });

export const getAdminCourses = async () =>
  request("api/admin/courses", { method: "GET" });

export const createUser = async (userData) =>
  request("api/admin/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });

export const updateUser = async (id, updates) =>
  request(`api/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

export const deleteUser = async (id) =>
  request(`api/admin/users/${id}`, { method: "DELETE" });

export const updateCourse = async (id, updates) =>
  request(`api/admin/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

export const deleteCourse = async (id) =>
  request(`api/admin/courses/${id}`, { method: "DELETE" });

// =======================
// Teacher Management (Admin)
// =======================

// Get all teachers
export const getTeachers = async () =>
  request("api/admin/teachers", { method: "GET" });

// Create a new teacher
export const createTeacher = async (teacherData) =>
  request("api/admin/teachers", {
    method: "POST",
    body: JSON.stringify(teacherData),
  });

// Approve or update teacher status
export const updateTeacherStatus = async (id, status) =>
  request(`api/admin/teachers/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const getStudents = async () =>
  request("api/admin/students", { method: "GET" });

export const updateStudentStatus = async (id, status) =>
  request(`api/admin/students/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
