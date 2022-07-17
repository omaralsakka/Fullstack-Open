import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../reducers/blogsReducer";
import { Link } from "react-router-dom";
import BlogForm from "./blogForm";

export const Blogs = ({ blogs }) => {
  const blogStyle = {
    border: "inset 2px black",
    padding: "10px",
    margin: "5px",
  };

  return (
    <>
      {blogs.map((blog) => {
        return (
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
            <br />
          </div>
        );
      })}
    </>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    dispatch(fetchBlogs()).then((response) => {
      const userBlogs = response.filter((blog) => {
        return blog.user.name === "elord";
      });
      setBlogs(userBlogs);
    });
  }, [dispatch]);

  return (
    <div>
      <BlogForm blogs={blogs} setBlogs={setBlogs} />
      <Blogs blogs={blogs} />
    </div>
  );
};

export default Home;
