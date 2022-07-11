import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const obj = { content, votes: 0 };
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const voteAnecdote = async (id) => {
  const anecdotes = await axios.get(baseUrl);
  let anecdote = anecdotes.data.find((anc) => anc.id === id);
  anecdote.votes += 1;
  const response = await axios.put(`${baseUrl}/${id}`, anecdote);
  return response.data;
};

export default { getAll, createNew, voteAnecdote };
