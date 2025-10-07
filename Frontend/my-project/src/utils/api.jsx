// Load API base URL automatically from .env
const BASE_URL = import.meta.env.VITE_API_URL;

// -------------------- Token Management --------------------

export const setAuthToken = (token) => localStorage.setItem("token", token);
export const getAuthToken = () => localStorage.getItem("token");
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// -------------------- API Helper --------------------

const postRequest = async (endpoint, data) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Something went wrong");
  }

  return res.json();
};

// -------------------- Auth APIs --------------------

export const register = async (form) => {
  const data = await postRequest("register", form);
  if (data.token) setAuthToken(data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const login = async (credentials) => {
  const data = await postRequest("login", credentials);
  if (data.token) setAuthToken(data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};
