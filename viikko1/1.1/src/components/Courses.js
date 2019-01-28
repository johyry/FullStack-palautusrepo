import React from "react";

const Courses = ({ courses }) => {
    return (
      courses.map(course => <Course key={course.id} course={course} />)
    )
  }
  
  const Course = ({ course }) => {
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
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
    return <ul>{Parts((parts = { parts }))}</ul>;
  };
  
  const Parts = ({ parts }) => {
    return ( 
      parts.map(part => 
      <Part
        key={part.id}
        part={part}
      />
      )
      
    )
  };
  
  const Part = ({ part }) => <li>{part.name} {part.exercises}</li>
  
  const Total = ({ parts }) =><p>Total {parts.reduce( (sum, part) => sum + part.exercises, 0)}</p>
  
  export default Courses