import axios from "axios";

const API_URL = "http://localhost:5000/api/recruiter";


export const searchCandidates = async (skill) => {
    const response = await axios.get(
        `${API_URL}/search?skill=${encodeURIComponent(skill)}`
    );

    return response.data;
};

export const getRecruiterProfile = async (email) => {
  const response = await axios.get(
    `${API_URL}/profile/${email}`
  );

  return response.data;
};

export const updateRecruiterProfile = async (email, data) => {
  const response = await axios.put(
    `${API_URL}/profile/${email}`,
    data
  );

  return response.data;
};