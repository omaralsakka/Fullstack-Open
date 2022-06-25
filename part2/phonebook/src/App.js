import { useState } from "react";

const Header = ({ title }) => <h2>{title}</h2>;

const PersonDisplay = ({ persons }) => {
  return persons.map((person) => {
    return (
      <div key={person.id}>
        {person.name} {person.number}
      </div>
    );
  });
};

const Persons = ({ persons, filter }) => {
  if (filter !== "") {
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(filter)
    );
    return <PersonDisplay persons={filtered} />;
  } else return <PersonDisplay persons={persons} />;
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: Math.random(1, 9999) },
    { name: "Ada Lovelace", number: "39-44-5323523", id: Math.random(1, 9999) },
    { name: "Dan Abramov", number: "12-43-234345", id: Math.random(1, 9999) },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: Math.random(1, 9999),
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const handleNewFilter = (event) => {
    setFilterName(event.target.value);
  };

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
      setPersons(persons.concat(newObj));
      setNewName("");
    } else alert(`${newName} is already in phonebook`);
  };

  return (
    <div>
      <Header title="Phonebook" />
      <div>
        filter shown with:{" "}
        <input value={filterName} onChange={handleNewFilter} />
      </div>

      <Header title="add a new" />

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

      <Header title="Numbers" />
      <Persons persons={persons} filter={filterName} />
    </div>
  );
};

export default App;
