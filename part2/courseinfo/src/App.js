const Header = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
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

const Total = ({ total }) => {
  let sum = 0;
  total.map((elem) => (sum += elem.exercises));
  return (
    <>
      <h5>total of {sum} exercises</h5>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((elem) => {
        return (
          <div key={elem.id}>
            <Part title={elem.name} exercises={elem.exercises} />
          </div>
        );
      })}
      <Total total={parts} />
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
