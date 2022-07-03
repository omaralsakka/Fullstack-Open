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
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObj = new Blog(initBlog[0]);
  await blogObj.save();
  blogObj = new Blog(initBlog[1]);
  await blogObj.save();
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

afterAll(() => {
  mongoose.connection.close();
});
