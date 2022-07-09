import { Vote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";

const Anecdotes = (props) => {
  const anecdotes = useSelector((state) => state.anecdotes);
  anecdotes.sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const handleVote = (id, content) => {
    dispatch(Vote(id));
    dispatch(newNotification("vote notification", content));
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
