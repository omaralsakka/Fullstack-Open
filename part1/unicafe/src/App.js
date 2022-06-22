import { useState } from "react";

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, totalSum }) => {
  if (totalSum !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={totalSum} />
          <StatisticLine text="average" value={CalcAvg(good, bad, totalSum)} />
          <StatisticLine
            text="positive"
            value={CalcPositive(totalSum, good) + " %"}
          />
        </tbody>
      </table>
    );
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
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
      <Statistics good={good} neutral={neutral} bad={bad} totalSum={totalSum} />
    </div>
  );
};

export default App;
