import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ search, setSearch }) => {
  const handleSetSearch = (e) => setSearch(e.target.value);
  return (
    <div>
      find countries
      <input value={search} onChange={handleSetSearch}></input>
    </div>
  );
};

const Languages = ({ languages }) => {
  const langs = Object.values(languages);
  let id = 0;
  return langs.map((language) => {
    id += 1;
    return (
      <div key={id}>
        <li>{language}</li>
      </div>
    );
  });
};

const FullDisplay = ({ result }) => {
  if (result !== "") {
    let country = result;
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>
          capital {country.capital[0]}
          <br></br>
          area {country.area}
        </p>
        <b>languages:</b>
        <ul>
          <Languages languages={country.languages} />
        </ul>
        <img width="10%" src={country.flags.svg} />
      </>
    );
  }
};

const Country = ({ country }) => {
  const [infoDisplay, setInfoDisplay] = useState("");

  return (
    <div key={country.tld[0]}>
      <div>
        {country.name.common}
        <button onClick={() => setInfoDisplay(country)}>show</button>
      </div>
      <FullDisplay result={infoDisplay} />
    </div>
  );
};

const Display = ({ result }) => {
  let id = 0;
  return result.map((countries) => {
    id += 1;
    return <Country key={id} country={countries} />;
  });
};

const Filter = ({ search, countries }) => {
  if (search !== "") {
    const result = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    if (result.length > 9) {
      return <>Too many matchers, specify another filter</>;
    } else if (result.length === 0) {
      return <>No matches with this filter</>;
    } else if (result.length === 1) {
      return (
        <>
          <FullDisplay result={result[0]} />
        </>
      );
    } else {
      return (
        <>
          <Display result={result} />
        </>
      );
    }
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      <Filter search={search} countries={countries} />
    </>
  );
}

export default App;
