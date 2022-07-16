import axios from "axios";
const baseUrl = "/api/login";
const userUrl = "/api/users";

export const login = async (credintials) => {
  const response = await axios.post(baseUrl, credintials);
  return response.data;
};

export const usersFetch = async () => {
  const response = await axios.get(userUrl);
  return response.data;
};
