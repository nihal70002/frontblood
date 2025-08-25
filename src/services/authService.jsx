import axios from "axios";

const API_URL = "https://localhost:7298/api/accounts/";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}register`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data; // Throw instead of return for proper error handling
    }
    throw { Message: "Registration failed - network error" };
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}login`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data; // Throw instead of return for proper error handling
    }
    throw { Message: "Login failed - network error" };
  }
};