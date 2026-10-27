import axios from "axios";

const API_URL =
"http://localhost:5000";

const ANALYZE_URL =
`${API_URL}/api/analyze/resume`;

export const uploadResume = async (formData) => {

    const response = await axios.post(
        `${API_URL}/api/resume/upload`,
        formData
    );

    return response.data;
};

export const getHistory =
async (email) => {

  const response =
    await axios.get(
      `${API_URL}/api/history/${email}`
    );

  return response.data;

};

export const analyzeResume =
async (data) => {

  const response =
    await axios.post(
      ANALYZE_URL,
      data
    );

  return response.data;
};