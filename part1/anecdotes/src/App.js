import { useState } from "react";

const Button = ({ handleClick, value }) => {
  return (
    <>
      <button onClick={handleClick}>{value}</button>
    </>
  );
};

const Votes = ({ votes }) => <>has {votes} votes</>;

const updateArr = (array, index) => {
  let temp_arr = [...array];
  let temp_element = temp_arr[index];

  temp_element += 1;

  temp_arr[index] = temp_element;

  return temp_arr;
};

const Max = ({ value, array, idx, anc }) => {
  if (value !== 0) {
    return (
      <>
        <h1>Anecdotes with most votes</h1>
        {anc[idx]}
        <br></br>
        <Votes votes={array[idx]} />
      </>
    );
  }
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votesarray, setArray] = useState(Array(7).fill(0));
  const mostVotes = Math.max(...votesarray);
  const mostIdx = votesarray.indexOf(mostVotes);
  return (
    <div>
      <h1>Anecdotes of the day</h1>
      {anecdotes[selected]}
      <br></br>

      <Votes votes={votesarray[selected]} />
      <br></br>

      <Button
        handleClick={() => setArray(updateArr(votesarray, selected))}
        value="vote"
      />
      <Button
        handleClick={() => setSelected(Math.floor(Math.random() * 7))}
        value="anecdotes"
      />
      <br></br>
      <Max value={mostVotes} array={votesarray} idx={mostIdx} anc={anecdotes} />
    </div>
  );
};

export default App;
