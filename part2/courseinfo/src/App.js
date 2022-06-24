const Title = ({ name }) => <h1>{name}</h1>;

const Header = ({ name }) => <h2>{name}</h2>;

const Part = ({ title, exercises }) => (
  <p>
    {title} {exercises}
  </p>
);

const Total = ({ total }) => {
  const sum = total.reduce((sum, idx) => {
    return sum + idx.exercises;
  }, 0);
  return (
    <>
      <h4>total of {sum} exercises</h4>
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
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <Title name="Web development curriculum" />
      {courses.map((elem) => {
        return <Course key={elem.id} course={elem} />;
      })}
    </>
  );
};

export default App;
