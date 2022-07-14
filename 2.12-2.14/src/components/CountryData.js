import React, { useState } from "react";

const CountryData = (country) => {

  const [show, SetShow] = useState(false)

  function showData () {
    SetShow(true)
  }

  return (
    <>
      <button className='btn' onClick={showData}>Show</button>
      {show ?
        <div className='showdata'>
            <h1>{country.countryData.name}</h1>
            <div>capital {country.countryData.capital}</div>
            <div>area {country.countryData.area}</div>
            <h2>languages:</h2>
            <ul>
              {country.countryData.languages.map((lang) => (
                <li key={lang.name}>{lang.name}</li>
              ))}
            </ul>
        </div>
      :
      null
      }
    </>
  );
};

export default CountryData;