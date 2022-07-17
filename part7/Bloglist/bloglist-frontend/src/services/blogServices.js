import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
export const userBlogs = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const getBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const addBlog = async (content) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, content, config);
  return response.data;
};

export const likeBlogService = async (id, newObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObj);
  return response.data;
};

export const addBlogComment = async (id, newObj) => {
  const response = await axios.put(`${baseUrl}/${id}/comments`, newObj);
  return response.data;
};
