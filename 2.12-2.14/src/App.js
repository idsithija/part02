import React, { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
    .get('https://restcountries.com/v2/all')
    .then(response => {
      setCountries(response.data)
  })

  }, []);

  function handleSearch(event) {
    setSearch(event.target.value)
  }

  const countriesToShow = search
  ? countries.filter(function (country) {
    return country.name.toLowerCase().indexOf(''+search.toLowerCase()+'') > -1;})
  : countries
  
  return (
    <div>
      find countries  <input type="text" onChange={handleSearch} />
      <Countries countries={countriesToShow} search={search} />
    </div>
  );
}

export default App;
