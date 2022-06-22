import { useState } from "react";

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  );
};

const Display = (props) => (
  <>
    <p>
      {props.text} {props.value}
    </p>
  </>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const totalSum = good + bad + neutral;
  const CalcAverage = (props) => {
    if (props[2] === 0) return 0;
    else return (props[0] - props[1]) / props[2];
  };
  const CalcPositive = (props) => {
    if (props[1] === 0) return 0;
    else return (props[0] / props[1]) * 100;
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={totalSum} />

      <Display text="average" value={CalcAverage([good, bad, totalSum])} />
      <Display text="positive" value={CalcPositive([good, totalSum]) + " %"} />
    </div>
  );
};

export default App;
