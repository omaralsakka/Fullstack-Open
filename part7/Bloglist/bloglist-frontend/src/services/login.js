import axios from "axios";
const baseUrl = "/api/login";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const login = async (credintials) => {
  const response = await axios.post(baseUrl, credintials);
  return response.data;
};

if (token) {
  console.log("token is set: ", token);
}

export default { login, setToken };
