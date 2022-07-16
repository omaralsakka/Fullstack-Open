import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../reducers/blogsReducer";
import { Link } from "react-router-dom";
import { userBlogs } from "../services/blogServices";

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
      <Blogs blogs={blogs} />
    </div>
  );
};

export default Home;
