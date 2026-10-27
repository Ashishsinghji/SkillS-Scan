import axios from "axios";

const API_URL = "http://localhost:5000";

export const getHistory = async (email) => {
  const response = await axios.get(
    `${API_URL}/api/history/${email}`
  );

  return response.data;
};

export const getLatestAnalysis = async (email) => {
  const response = await axios.get(
    `${API_URL}/api/history/${email}`
  );

  return response.data[0] || null;
};