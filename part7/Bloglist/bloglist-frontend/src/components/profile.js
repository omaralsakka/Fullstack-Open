import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogServices";

const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title} by {blog.author} <br />
      has {blog.likes} likes <br />
    </div>
  );
};

const Profile = () => {
  const user = useSelector((state) => state.login.user);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then((response) => {
      setBlogs(response);
    });
  }, []);
  //   console.log(blogs);
  return (
    <div>
      <h1>{user.name}</h1>
      <br />
      {blogs.map((blog) => {
        return (
          <div>
            <Blog blog={blog} /> <br />
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
