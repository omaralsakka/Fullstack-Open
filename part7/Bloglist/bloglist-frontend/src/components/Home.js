import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../reducers/blogsReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { userBlogs } from "../services/blogServices";

const BlogPreview = ({ blog }) => {
  return <div>This is single blog preview {blog.title}</div>;
};

const Blog = ({ blog }) => {
  const blogLink = `/${blog.id}`;
  return (
    <div>
      {blog.title} by {blog.author} <br />
    </div>
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
      <div>
        {blogs.map((blog) => {
          return <Blog key={blog.id + 1} blog={blog} />;
        })}
      </div>
      {/* <Routes>
        {blogs.map((blog) => {
          return (
            <Route
              key={blog.id + 2}
              path={`/${blog.id}`}
              element={<BlogPreview blog={blog} />}
            />
          );
        })}
      </Routes> */}
    </div>
  );
};

export default Home;
