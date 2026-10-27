import axios from "axios";

const API_URL = "http://localhost:5000";

export const getDashboardData = async (email) => {
  const response = await axios.get(`${API_URL}/api/dashboard/${email}`);
  return response.data;
};

