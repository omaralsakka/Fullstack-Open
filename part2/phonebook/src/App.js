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

const AddToServer = (newObj) => {
  return axios.post(baseUrl, newObj);
};

const UpdateServer = (id, newObj) => {
  return axios.put(`${baseUrl}/${id}`, newObj);
};

const DeleteFromServer = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const Delete = ({ name, id, persons, setPersons }) => {
  const DeleteUser = (name, id, persons, setPersons) => {
    if (window.confirm(`Delete ${name} ?`)) {
      let tmpArr = persons.filter((elem) => {
        return elem.id !== id;
      });
      DeleteFromServer(id);
      setPersons(tmpArr);
    }
  };
  return (
    <button onClick={() => DeleteUser(name, id, persons, setPersons)}>
      Delete
    </button>
  );
};

const Message = ({ message, setMessage, errMsg }) => {
  let C = errMsg > 0 ? "red" : "green";
  const Msg = {
    color: C,
    fontStyle: "italic",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 5000);

    return <div style={Msg}>{message}</div>;
  }
};

// handling the form behavior and adding person to the phonebook
const Form = ({
  newName,
  setNewName,
  setNewNumber,
  newNumber,
  persons,
  setPersons,
  setMessage,
  setErrMsg,
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
      AddToServer(newObj);
      setPersons(persons.concat(newObj));
      setMessage(`Added ${newName}`);
    } else {
      if (nameCheck[0].number !== newNumber) {
        nameCheck[0].number = newNumber;
        UpdateServer(nameCheck[0].id, nameCheck[0])
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== nameCheck[0].id ? person : response.data
              )
            );
          })
          .catch((error) => {
            setErrMsg(1);
            setMessage(
              `Information of '${newName}' was already removed from server`
            );
          });
        setMessage(`${newName} number has been changed`);
        // }
      } else setMessage(`${newName} already existed`);
    }
    setNewName("");
    setNewNumber("");
    setErrMsg(0);
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
const PersonDisplay = ({ persons, setPersons }) => {
  return persons.map((person) => {
    return (
      <div key={person.id}>
        {person.name} {person.number}{" "}
        <Delete
          name={person.name}
          persons={persons}
          id={person.id}
          setPersons={setPersons}
        ></Delete>
      </div>
    );
  });
};

// To handle which persons to display
const Persons = ({ persons, filter, setPersons }) => {
  if (filter !== "") {
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
    return <PersonDisplay persons={filtered} setPersons={setPersons} />;
  } else return <PersonDisplay persons={persons} setPersons={setPersons} />;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);
  return (
    <div>
      <Header title="Phonebook" />
      <Message message={message} setMessage={setMessage} errMsg={errMsg} />
      <Filter value={filterName} setFilterName={setFilterName} />

      <Header title="add a new" />

      <Form
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
        setErrMsg={setErrMsg}
      />

      <Header title="Numbers" />
      <Persons persons={persons} filter={filterName} setPersons={setPersons} />
    </div>
  );
};

export default App;
