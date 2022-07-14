import axios from "axios";
const baseUrl = "/api/login";
let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const login = async (credintials) => {
  const response = await axios.post(baseUrl, credintials);
  return response.data;
};
