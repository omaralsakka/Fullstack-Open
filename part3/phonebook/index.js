const express = require("express");

const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Omar Alsakka",
    number: "12-43-111345",
  },
];

const generateId = () => {
  const randId = Math.floor(Math.random(0, 99) * 1000000);
  return randId;
};

// fetches all phonebook names
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// fetches a single user if exist
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// adds a person to the phonebook
app.post("/api/persons", (request, response) => {
  const body = request.body;
  errorHandling(body, response);
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(persons);
});

// function to check for errors in inputs
const errorHandling = (body, response) => {
  const checkPerson = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    response.status(400).json({
      error: "content missing",
    });
  } else if (checkPerson) {
    response.status(400).json({
      error: "name must be unique",
    });
  }
};

// deletes a person by giving an id
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

// fetches info about the whole phonebook
app.get("/info", (request, response) => {
  const ppl = persons.length;
  const date = new Date();
  const info = `Phonebook has info for ${ppl} people\n${date}`;
  response.end(info);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`app rendering on port ${PORT}`);
});
