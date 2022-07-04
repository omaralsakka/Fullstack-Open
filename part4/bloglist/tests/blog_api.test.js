const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const {
  initBlog,
  initWrongInput,
  blogsDb,
  usersInDb,
} = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// for Correct inputs
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initBlog);
});

describe("Initializing users in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "oabdelfa",
      name: "Omar Abdelfattah",
      password: "123456",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe("Initilized blogs into db", () => {
  test("likes default to 0 in undefined", async () => {
    const resp = await api.get("/api/blogs");
    const res = resp.body.map((cont) => cont.likes);
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
});

describe("Handling error inputs", () => {
  test("returning 400 error", async () => {
    let blogObj = new Blog(initWrongInput);
    await api.post("/api/blogs", blogObj).expect(400);
  });
});

describe("Updating & Deleting blogs", () => {
  test("updating blog", async () => {
    let blogsInDb = await blogsDb();
    let blogToUpdate = blogsInDb[0];

    // console.log("this is the id", blogToUpdate.id);
    await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: 41 });

    const response = await api.get("/api/blogs");
    const contents = response.body;

    expect(200);
    expect(contents[0].likes).toEqual(41);
  });

  test("deleting blog", async () => {
    let blogsInDb = await blogsDb();
    let blogToDelete = blogsInDb[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  });

  test("updating blog", async () => {});
});

afterAll(() => {
  mongoose.connection.close();
});
