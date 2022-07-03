const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);

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

const initWrongInput = {
  title: "",
  author: "John Cena",
  url: "",
  likes: 20,
};

// for Correct inputs
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(initBlog[0]);
  await blogObj.save();
  blogObj = new Blog(initBlog[1]);
  await blogObj.save();
  blogObj = new Blog(initBlog[2]);
  await blogObj.save();
});

test("likes default to 0 in undefined", async () => {
  const resp = await api.get("/api/blogs");
  const res = resp.body.map((cont) => cont.likes);
  console.log(res);
  expect(res).toContain(0);
});

test("returning json format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("id is defined", async () => {
  const response = await api.get("/api/blogs");
  const id = response.body.map((content) => content._id);
  expect(id).toBeDefined();
});

test("all blogs returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initBlog.length);
});

test("specific blog exist", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map((content) => content.title);
  expect(contents).toContain("Harry Potter");
});

test("returning 400 error", async () => {
  let blogObj = new Blog(initWrongInput);
  await api.post("/api/blogs", blogObj).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
