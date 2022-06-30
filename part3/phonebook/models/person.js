const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose.connect(url);

const personSchema = new mongoose.Schema(
  {
    name: { type: String, minLength: 3, required: true },
    number: { type: String, minLength: 6, required: true },
  },
  { collection: "persons" }
);

// formatting the returned objects from mongoose to strings
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
