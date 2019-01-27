import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = {
    name: "Half Stack -sovelluskehitys",
    parts: [
      {
        id: 1,
        name: "Reactin perusteet",
        exercises: 10
      },
      {
        id: 2,
        name: "Tiedonvälitys propseilla",
        exercises: 7
      },
      {
        id: 3,
        name: "Komponenttien tila",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Course course={course} />
    </div>
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

const Header = props => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  console.log("toimii paikassa content", parts);
  return <ul>{Parts((parts = { parts }))}</ul>;
};

const Parts = ({ parts }) => {
  console.log("toimii paikassa parts", parts);
  return ( 
    parts.map(part => 
    <Part
      key={part.id}
      part={part}
    />
    )
    
  )
};

const Part = ({ part }) => {
  console.log("toimii paikassa part", part);

  return <li>{part.name} {part.exercises}</li>;
};

const Total = props => {
  return (
    <div>
      <p>
        yhteensä{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}{" "}
        tehtävää
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
