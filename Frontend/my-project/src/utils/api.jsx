const BASE_URL = "http://localhost:3000/api/auth";

// Save token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token from localStorage
export const getAuthToken = () => localStorage.getItem("token");

// Remove token (logout)
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Register user
export const register = async (userData) => {
  const res = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

// Login user
export const login = async (credentials) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};
