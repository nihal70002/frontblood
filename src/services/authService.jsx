import axios from "axios";

// ⚡ Make sure this port matches launchSettings.json in your API
// Example: "applicationUrl": "https://localhost:7298;http://localhost:5298"
const API_URL = "https://localhost:7298/api/Accounts"; 

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

// ✅ Login user (make sure you implement [HttpPost("login")] in AccountsController)
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
