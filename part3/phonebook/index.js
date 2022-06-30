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
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  // Person is the module returned now from person module.
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  Person.find({}).then((persons) => {
    let obj = persons.find((person) => person.name === body.name);

    if (obj) {
      // if user in db but number is different, we add a 2nd phone number
      // to the user object
      if (!obj.number.includes(body.number)) {
        Person.findByIdAndUpdate(obj.id, {
          number: `${obj.number}, ${body.number}`,
        }).then((updatedPerson) => {
          response.json(updatedPerson).catch((error) => next(error));
        });
      } else {
        console.log("number in database");
      }
    } else {
      // Save the new person and response only if success
      person
        .save()
        .then((savedPerson) => {
          // the data coming back is stringfy modified response
          response.json(savedPerson);
        })
        .catch((error) => next(error));
    }
  });
});

// deletes a person by giving an id
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndPoint = (request, response) => {
  return response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndPoint);

// error handling function wrong
const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

// We either run our port on Heroku's configuration which uses .env.PORT
// or we use port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
