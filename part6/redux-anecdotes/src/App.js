import AnecdoteForm from "./components/AnecdoteForm";
import AnecdotesList from "./components/AnecdoteList.";
import Notification from "./components/Notification";
const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
