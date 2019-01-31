import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [selected, setSelected] = useState(0);
  const [test, setTest] = useState(
    Array.apply(null, new Array(props.anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  const selectRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  };

  const voteAnecdote = () => {
    const copy = [...test];
    copy[selected]++;
    setTest(copy);
  };

  return (
    <div>
      <PrintTitle text={"Anecdote of the Day"} />

      {props.anecdotes[selected]}
      <p>Has {test[selected]} votes</p>

      <Button
        handleClick={selectRandomAnecdote}
        text="Select random anecdote"
      />
      <Button handleClick={voteAnecdote} text="Vote" />

      <PrintTitle text={"Anecdote with Most Votes"} />
      <FindTopAnecdote list={test} />
    </div>
  );
};

var best = 0;

const PrintTitle = props => {
  return <h1>{props.text}</h1>;
};

const FindTopAnecdote = ({ list }) => {
  var i;

  for (i = 0; i < list.length; i++) {
    if (list[i] > list[best]) {
      best = i;
    }
  }

  return (
    <div>
      <p> {anecdotes[best]}</p>
      <p>Has {list[best]} votes </p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
