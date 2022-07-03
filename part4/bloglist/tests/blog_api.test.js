const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const { initBlog, initWrongInput, blogsDb } = require("./test_helper");

// for Correct inputs
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initBlog);
});

describe("Initilized blogs into db", () => {
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
});

describe("Handling error inputs", () => {
  test("returning 400 error", async () => {
    let blogObj = new Blog(initWrongInput);
    await api.post("/api/blogs", blogObj).expect(400);
  });
});

describe("Updating & Deleting blogs", () => {
  test("deleting blog", async () => {
    let blogsInDb = await blogsDb();
    let blogToDelete = blogsInDb[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
