const Blog = require("../models/blog");
const User = require("../models/user");
const initBlog = [
  {
    title: "Game Of Thrones",
    author: "Snowman",
    url: "got.com",
    likes: 10,
  },
  {
    title: "Harry Potter",
    author: "J.K",
    url: "harrypotter.com",
    likes: 20,
  },
  {
    title: "Batman",
    author: "C.Nolan",
    url: "batman.com",
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

let blogsDb = () => {
  return Blog.find({}).then((blogs) => {
    return blogs;
  });
};

const initWrongInput = {
  title: "",
  author: "John Cena",
  url: "",
  likes: 20,
};

module.exports = { initBlog, initWrongInput, blogsDb, usersInDb };
