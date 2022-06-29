const express = require("express");

const app = express();
const persons = [
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
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

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
