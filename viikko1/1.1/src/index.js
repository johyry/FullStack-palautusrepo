import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = props => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const Content = props => {
  console.log(props);
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  );
};

const Part = props => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  );
};

const Total = props => {
  return (
    <div>
      <p>
        yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}{" "}
        tehtävää
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
