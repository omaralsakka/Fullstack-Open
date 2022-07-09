import { Vote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  newNotification,
  hideNotification,
} from "../reducers/notificationReducer";
const Anecdotes = (props) => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const handleVote = (id, content) => {
    dispatch(Vote(id));
    dispatch(newNotification(`you voted for '${content}'`));
    setTimeout(() => {
      dispatch(hideNotification(""));
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Anecdotes;
