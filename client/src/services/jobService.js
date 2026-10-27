import axios from "axios";

const API_URL = "http://localhost:5000";

export const createJob = async (jobData) => {
  const response = await axios.post(
    `${API_URL}/api/jobs`,
    jobData
  );

  return response.data;
};

export const updateJob = async (id, jobData) => {

    const response = await axios.put(
        `${API_URL}/api/jobs/${id}`,
        jobData
    );

    return response.data;
};

export const getRecruiterJobs = async (email) => {
  const response = await axios.get(
    `${API_URL}/api/jobs/${email}`
  );

  return response.data;

};

export const getAllJobs = async () => {

  const response = await axios.get(
    `${API_URL}/api/jobs`
  );

  return response.data;

};

export const deleteJob = async (id) => {
    const response = await axios.delete(
        `${API_URL}/api/jobs/${id}`
    );

    return response.data;
};