import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { setNotification } from "./notificationReducer";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
    updateVoteAnecdote(state, action) {
      return state
        .map((state) =>
          state.id !== action.payload.id
            ? state
            : action.payload.updatedAnecdote
        )
        .sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { appendAnecdote, setAnecdotes, updateVoteAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const NewAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(NewAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const VotedAnecdote = await anecdoteService.voteAnecdote(id);
    dispatch(updateVoteAnecdote({ id: id, updatedAnecdote: VotedAnecdote }));
    dispatch(setNotification(VotedAnecdote.content, 5));
  };
};

export default anecdoteSlice.reducer;
