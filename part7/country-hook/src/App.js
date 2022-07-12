import { useState, useEffect } from "react";
import axios from "axios";

const getCountry = async (country) => {
  if (country) {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${country}?fullText=true`
      );
      return response;
    } catch (err) {
      console.log("wrong country's name request!");
    }
  }
};

const strTitle = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    getCountry(name).then((resp) => {
      try {
        setCountry(resp.data[0]);
      } catch (err) {}
    });
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>;
  }
  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(strTitle(nameInput.value.toLowerCase()));
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
