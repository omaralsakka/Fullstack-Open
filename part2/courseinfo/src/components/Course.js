import React from "react";
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

export default Course;
