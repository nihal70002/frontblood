import axios from "axios";

// ✅ Use the correct base URL from Swagger
const API_URL = "http://localhost:5181/api/Accounts";

// ✅ Register user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw { Message: "Registration failed - network error" };
  }
};

// ✅ Login user
export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw { Message: "Login failed - network error" };
  }
};
