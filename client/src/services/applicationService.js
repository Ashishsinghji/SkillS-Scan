import axios from "axios";

const API_URL = "http://localhost:5000/api/application";

export const applyJob = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const getStudentApplications = async (email) => {
    const response = await axios.get(`${API_URL}/${email}`);
    return response.data;
};

export const getRecruiterApplications = async (email) => {
    const response = await axios.get(`${API_URL}/recruiter/${email}`);
    return response.data;
};

export const updateApplicationStatus = async (id, status) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        { status }
    );

    return response.data;
};
export const scheduleInterview = async (id, interviewData) => {
    const response = await axios.put(
        `${API_URL}/${id}/interview`,
        interviewData
    );

    return response.data;
};