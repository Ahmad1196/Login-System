const API_URL = "http://localhost:3000/api";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  return { ok: response.ok, ...data };
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return { ok: response.ok, ...data };
};

export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  return {
    ok: response.ok,
    ...data,
  };
};

export const logoutUser = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  return {
    ok: response.ok,
    ...data,
  };
};

export const changePassword = async (passwordData) => {
  const response = await fetch(`${API_URL}/auth/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(passwordData),
  });

  const data = await response.json();

  return {
    ok: response.ok,
    ...data,
  };
};
