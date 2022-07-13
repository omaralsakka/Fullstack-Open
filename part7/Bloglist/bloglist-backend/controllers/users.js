const bcrypt = require("bcrypt");
const User = require("../models/user");
const usersRouter = require("express").Router();
const helper = require("../tests/test_helper");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username && password && username.length > 3 && password.length > 3) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const usersInDb = await helper.usersInDb();
    const userNames = usersInDb.map((u) => u.username);
    if (userNames.includes(username)) {
      return response.status(400).json({
        error: "username must be unique",
      });
    }
    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } else {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }
});

module.exports = usersRouter;
