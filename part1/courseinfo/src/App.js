const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.title} {props.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  const parts = props.parts;
  return (
    <>
      {parts.map((elem) => {
        return (
          <>
            <Part title={elem.name} exercises={elem.exercises} />
          </>
        );
      })}
    </>
  );
};

const Total = (props) => {
  const arr = props.total;
  let total = 0;
  arr.map((elem) => (total += elem.exercises));
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts} />
    </div>
  );
};

export default App;
