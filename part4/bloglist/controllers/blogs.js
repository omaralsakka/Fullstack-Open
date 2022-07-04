const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", (request, response) => {
  Blog.find({})
    .populate("user", { username: 1, name: 1, id: 1 })
    .then((blogs) => {
      response.json(blogs);
    });
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  if (!blog.title || !blog.url) {
    response
      .status(400)
      .json({
        error: "title or url missing",
      })
      .end();
  } else {
    blog.save().then((result) => {
      user.blogs = user.blogs.concat(result._id);
      user.save();
      response.status(201).json(result);
    });
  }
});

blogsRouter.delete("/:id", (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).json(result);
    })
    .catch((error) => next(error));
});

blogsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const newUpdate = {
    likes: body.likes,
  };
  Blog.findByIdAndUpdate(request.params.id, newUpdate, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
