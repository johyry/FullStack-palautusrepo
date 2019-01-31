import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Martti Tienari", number: "040-123456" },
    { name: "Arto Järvinen", number: "040-123456" },
    { name: "Lea Kutvonen", number: "040-123456" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addNumber = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };

    if (!personsContains(personObject)) {
      setPersons(persons.concat(personObject));
    } else {
      window.alert(`${newName} on jo luettelossa`);
    }
    setNewName("");
  };

  const personsContains = personObject => {
    for (var i = 0; i < persons.length; i++) {
      if (persons[i].name === personObject.name) {
        return true;
      }
    }
    return false;
  };

  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Filter value={newFilter} onChange={handleFilterChange} />

      <h2>Lisää uusi</h2>

      <PersonForm 
        onSubmit={addNumber}
        valueName={newName}
        onNameChange={handleNameChange}
        valueNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
            
      <h2>Numerot</h2>

      <Numerot numbers={persons} filter={newFilter} />
    </div>
  );
};

const Filter = props => (
  <form>
    <div>
      Rajaa näytettäviä: <input value={props.value} onChange={props.onChange} />
    </div>
  </form>
);

const PersonForm = props => (
  <form onSubmit={props.onSubmit}>
    <div>
      nimi: <input value={props.valueName} onChange={props.onNameChange} />
    </div>
    <div>
      numero: <input value={props.valueNumber} onChange={props.onNumberChange} />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
);



const Numerot = ({ numbers, filter }) => {
  const filtered = numbers.filter(number => number.name.includes(filter));
  console.log(filtered);

  return filtered.map(number => (
    <p key={number.name}>
      {number.name} {number.number}
    </p>
  ));
};

export default App;
