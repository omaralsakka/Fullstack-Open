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

const Content = ({ parts }) => {
  // const parts = parts.parts;

  return (
    <>
      {parts.map((elem) => {
        return (
          <div key={elem.id}>
            <Part title={elem.name} exercises={elem.exercises} />
          </div>
        );
      })}
    </>
  );
};

// const Total = (props) => {
//   const arr = props.total.parts;
//   let total = 0;
//   arr.map((elem) => (total += elem.exercises));
//   return (
//     <>
//       <p>Number of exercises {total}</p>
//     </>
//   );
// };

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
    ],
  };

  return <Course course={course} />;
};

export default App;
