// src/utils/api.js

// Base URL from environment variable
// For local dev: VITE_API_URL=http://localhost:3000/api/auth
// For production: VITE_API_URL=https://your-backend-name.onrender.com/api/auth
const BASE_URL = import.meta.env.VITE_API_URL;

// -------------------- Token Management --------------------

// Save token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token from localStorage
export const getAuthToken = () => localStorage.getItem("token");

// Remove token and user data (logout)
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// -------------------- API Requests --------------------

// Helper function for POST requests
const postRequest = async (endpoint, data) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // If backend returns error status, throw it
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Request failed");
  }

  return res.json();
};

// Register user
export const register = async (userData) => {
  return postRequest("register", userData);
};

// Login user
export const login = async (credentials) => {
  const data = await postRequest("login", credentials);

  // Save token and user info if returned
  if (data.token) setAuthToken(data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

// Example: fetch protected data
export const fetchProtected = async (endpoint) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token");

  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch");
  }

  return res.json();
};
