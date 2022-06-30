const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://omar:${password}@cluster0.7gmeufe.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
  },
  { collection: "persons" }
);

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 5 && process.argv.length > 3) {
  console.log(
    "please provide the person data as an argument: node mongo.js <password> <name> <phone number>"
  );
} else if (process.argv.length == 3) {
  mongoose.connect(url).then((result) => {
    Person.find({}).then((result) => {
      result.forEach((person) => {
        console.log(person);
      });
      mongoose.connection.close();
    });
  });
} else if (process.argv.length == 5) {
  mongoose
    .connect(url)
    .then((result) => {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });
      return person.save();
    })
    .then(() => {
      console.log("new added person saved");
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
