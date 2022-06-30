require("dotenv").config();
const Person = require("./models/person");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("build"));

const generateId = () => {
  const randId = Math.floor(Math.random(0, 99) * 1000000);
  return randId;
};

// fetches all phonebook names
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// fetches a single user if exist
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// adds a person to the phonebook
app.post("/api/persons", (request, response) => {
  const body = request.body;

  // Person is the module returned now from person module.
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  Person.find({}).then((persons) => {
    let obj = persons.find((person) => person.name === body.name);

    if (obj) {
      if (body.number !== obj.number) {
        Person.findByIdAndUpdate(obj.id, {
          number: `${obj.number}, ${body.number}`,
        }).then((updatedPerson) => {
          response.json(updatedPerson);
        });
      } else {
        console.log("number in db");
      }
    } else {
      // Save the new person and response only if success
      person.save().then((savedPerson) => {
        // the data coming back is stringfy modified response
        response.json(savedPerson);
      });
    }
  });
});

// deletes a person by giving an id
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// fetches info about the whole phonebook
app.get("/info", (request, response) => {
  const ppl = persons.length;
  const date = new Date();
  const info = `Phonebook has info for ${ppl} people\n${date}`;
  response.end(info);
});

// We either run our port on Heroku's configuration which uses .env.PORT
// or we use port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
