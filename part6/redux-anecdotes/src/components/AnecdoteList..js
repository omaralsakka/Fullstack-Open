import { voteAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";

const Anecdotes = (props) => {
  const anecdotes = props.anecdotes;

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => props.voteAnecdote(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  };
};

const mapDispatchToProps = {
  voteAnecdote,
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes);
export default ConnectedAnecdotes;
