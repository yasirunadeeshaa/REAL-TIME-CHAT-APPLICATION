import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Update with your backend URL

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Login failed";
    }
};
