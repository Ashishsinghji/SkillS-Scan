import axios from "axios";

const API_URL =
  "http://localhost:5000/api/student";


export const getStudentProfile = async (email) => {

  const response = await axios.get(
    `${API_URL}/profile/${encodeURIComponent(email)}`
  );

  return response.data;

};


export const updateStudentProfile = async (
  email,
  data
) => {

  const response = await axios.put(
    `${API_URL}/profile/${encodeURIComponent(email)}`,
    data
  );

  return response.data;

};