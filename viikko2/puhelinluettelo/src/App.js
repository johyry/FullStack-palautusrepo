import React, { useState, useEffect } from "react";
import personService from "./services/persons";



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addNumber = event => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };

    const onko = personsContains(newName)
    

    if (onko === -1) {
      personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      });
    } else {
      onko.number = newNumber
      console.log('??', onko)
      if (window.confirm(`${onko.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        personService
          .update(onko)
          .then(returnedObject => {
            console.log(returnedObject)
            setPersons(persons.map(p => p.id !== returnedObject.id ? p : returnedObject))
          })
      }
      //window.alert(`${newName} on jo luettelossa`);
    }
    setNewName("");
    setNewNumber("");
  };

  const deleteNumber = ({ number }) => {

    if (window.confirm(`Poistetaanko ${number.name}`)) {
      personService
      .Delete(number.id)
    
      setPersons(persons.filter(p => p.id !== number.id))
    }
    
  }

  const personsContains = name => {
    for (var i = 0; i < persons.length; i++) {
      if (persons[i].name === name) {
        return persons[i]
      }
    }
    return -1;
  };

  const handleNameChange = event => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    //console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    //console.log(event.target.value);
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

      <Numerot 
        numbers={persons} 
        filter={newFilter}
        handleClick={(number) => deleteNumber(number)}
      />
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
      numero:{" "}
      <input value={props.valueNumber} onChange={props.onNumberChange} />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
);

const Numerot = ({ numbers, filter, handleClick }) => {
  const filtered = numbers.filter(number =>
    number.name.toUpperCase().includes(filter.toUpperCase())
  );

  return filtered.map(number => (
    <div key={number.id}>
      {number.name} {number.number}
      <button onClick={() => handleClick({number})}>delete</button>
    </div>
  ));
};

export default App;
