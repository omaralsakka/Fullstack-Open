const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passCheck =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (user && passCheck) {
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } else {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }
});

module.exports = loginRouter;
