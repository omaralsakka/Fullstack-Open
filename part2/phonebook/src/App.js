import { useState } from "react";

const Persons = ({ persons }) => {
  return persons.map((person) => {
    return <div key={person.id}>{person.name}</div>;
  });
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: Math.random(1, 9999) },
  ]);

  const [newName, setNewName] = useState("");

  const handleNewPerson = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const nameCheck = persons.filter((person) => person.name === newName);

    if (!nameCheck.length) {
      const newObj = {
        name: newName,
        id: Math.random(1, 9999),
      };
      setPersons(persons.concat(newObj));
      setNewName("");
    } else alert(`${newName} is already in phonebook`);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewPerson} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <br></br>
      <Persons persons={persons} />
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
