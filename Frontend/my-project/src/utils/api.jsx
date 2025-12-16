const BASE_URL = import.meta.env.VITE_API_URL;

export const setAuthToken = (token) => localStorage.setItem("token", token);
export const getAuthToken = () => localStorage.getItem("token");
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const request = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Only add JSON content-type if body is not FormData
  if (
    !(options.body instanceof FormData) &&
    options.method &&
    options.method !== "GET"
  ) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Something went wrong");
  }

  return res.json();
};

// Auth APIs
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
  if (data.token) setAuthToken(data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const getProfile = async () => request("api/users/me");

// Course APIs
export const createCourse = async (courseData) => {
  return request("api/courses", {
    method: "POST",
    body: courseData, // FormData
  });
};

export const getCourses = async () => request("api/courses", { method: "GET" });

export const getCourseById = async (id) =>
  request(`api/courses/${id}`, { method: "GET" });
