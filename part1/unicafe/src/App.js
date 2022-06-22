import { useState } from "react";

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  );
};

const Statistics = (props) => {
  return (
    <>
      <p>
        {props.text} {props.value}
      </p>
    </>
  );
};

const CalcPositive = (total, good) => {
  if (total !== 0) return (good / total) * 100;
  return 0;
};

const CalcAvg = (good, bad, total) => {
  if (total !== 0) return (good - bad) / total;
  return 0;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const totalSum = good + bad + neutral;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics text="good" value={good} />
      <Statistics text="neutral" value={neutral} />
      <Statistics text="bad" value={bad} />
      <Statistics text="all" value={totalSum} />
      <Statistics text="average" value={CalcAvg(good, bad, totalSum)} />
      <Statistics text="positive" value={CalcPositive(totalSum, good) + " %"} />
    </div>
  );
};

export default App;
