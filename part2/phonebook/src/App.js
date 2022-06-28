import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

// for section titles
const Header = ({ title }) => <h2>{title}</h2>;

// handiling filtering the name
const Filter = ({ filterName, setFilterName }) => {
  const handleNewFilter = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      filter shown with: <input value={filterName} onChange={handleNewFilter} />
    </div>
  );
};

const UpdateServer = (newObj) => {
  return axios.post(baseUrl, newObj);
};

// handling the form behavior and adding person to the phonebook
const Form = ({
  newName,
  setNewName,
  setNewNumber,
  newNumber,
  persons,
  setPersons,
}) => {
  const handleNewPerson = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const nameCheck = persons.filter((person) => person.name === newName);

    if (!nameCheck.length) {
      const newObj = {
        name: newName,
        number: newNumber,
        id: Math.random(1, 9999),
      };
      UpdateServer(newObj);
      setPersons(persons.concat(newObj));
      setNewName("");
      setNewNumber("");
    } else alert(`${newName} is already in phonebook`);
  };

  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewPerson} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

// Displaying the selected persons from the list
const PersonDisplay = ({ persons }) => {
  return persons.map((person) => {
    return (
      <div key={person.id}>
        {person.name} {person.number}
      </div>
    );
  });
};

// To handle which persons to display
const Persons = ({ persons, filter }) => {
  if (filter !== "") {
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
    return <PersonDisplay persons={filtered} />;
  } else return <PersonDisplay persons={persons} />;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);
  return (
    <div>
      <Header title="Phonebook" />

      <Filter value={filterName} setFilterName={setFilterName} />

      <Header title="add a new" />

      <Form
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />

      <Header title="Numbers" />
      <Persons persons={persons} filter={filterName} />
    </div>
  );
};

export default App;
