import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../reducers/blogsReducer";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import { userBlogs } from "../services/blogServices";

const Blog = ({ blog }) => {
  const blogLink = `/${blog.id}`;
  return (
    <Link to={blogLink}>
      {blog.title} by {blog.author} <br />
    </Link>
  );
};

const Blogs = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
            <br />
          </div>
        );
      })}
      <Outlet />
    </>
  );
};

const Home = () => {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    dispatch(fetchBlogs()).then((response) => {
      const userBlogs = response.filter((blog) => {
        return blog.user.name === "elord";
      });
      setBlogs(userBlogs);
    });
  }, []);

  return (
    <div>
      <h1>{user.name}</h1>
      <br />
      <Blogs blogs={blogs} />
    </div>
  );
};

export default Home;
