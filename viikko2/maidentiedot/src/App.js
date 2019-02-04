import React, { useState, useEffect } from "react";
import axios from "axios";

const App = props => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h1>Maiden tiedot</h1>

      <Filter value={newFilter} onChange={handleFilterChange} />

      <h2>Maat:</h2>

      <Countries countries={countries} filter={newFilter} />
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

const Countries = ({ countries, filter }) => {
  const [country, setCountry] = useState([]);

  const filtered = countries.filter(country =>
    country.name.toUpperCase().includes(filter.toUpperCase())
  );

  const showCountryPage = props => {
    
    console.log("showcountrypage", props)
    setCountry(...country, props);
    console.log("showcountrypage123", country)
  }

  if (filtered.length > 10) {
    return <p>Liian monta maata löytyi. Tarkenna hakua.</p>;
  }

  if (country.length > 0) {
    console.log(country)
    return <ViewCountry country={country[0]} />;
  }
  
  if (filtered.length === 1) {
    return <ViewCountry country={filtered[0]} />;
  }


  return filtered.map(country => <p key={country.name}>{country.name} <Button showCountry={() => showCountryPage(country)} /> </p>);

  
};

const Button = props => {
  console.log("button", props)
  return <button onClick={props.showCountry}>show</button>
}

const ViewCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <ul>
        <li>Capital: {country.capital}</li>
        <li>Population: {country.population}</li>
      </ul>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag of the country" height={150} width={200} />
    </div>
  );
};


  


export default App;
