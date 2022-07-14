import axios from "axios";
const baseUrl = "/api/blogs";

export const userBlogs = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const getBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
