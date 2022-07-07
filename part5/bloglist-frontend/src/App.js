import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoggedUser from "./components/loggedUser";
import Message from "./components/message";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/blogForm";
import Togglable from "./components/Togglable";

const blogStyle = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "10%",
  backgroundColor: "rgb(228, 239, 176)",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "5px",
  marginBottom: "5px",
};

let buttonStyle = {
  cursor: "pointer",
  width: "30%",
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const refreshBlogs = () => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setMessage({ txt: "Logged in", type: 1 });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUserName("");
      setPassword("");
    } catch (exception) {
      setMessage({ txt: "Wrong credentials", type: 2 });
      return (
        <>
          <h1>Wrong Credintials</h1>
        </>
      );
    }
  };

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedblog) => {
      setBlogs(blogs.concat(returnedblog));
    });
  };

  const LikeButton = ({ blog }) => {
    const handleClick = (blog) => {
      let newObj = blog;
      newObj.likes += 1;
      blogService.likeBlog(newObj.id, newObj);
      refreshBlogs();
    };
    return (
      <button style={buttonStyle} onClick={() => handleClick(blog)}>
        like
      </button>
    );
  };

  const DeleteButton = ({ blog }) => {
    let removeStyle = {
      cursor: buttonStyle.cursor,
      width: buttonStyle.width,
      backgroundColor: "rgb(17, 134, 212)",
      borderRadius: "5px",
      border: "none",
      color: "white",
      padding: "5px",
    };
    const handleClick = (blog) => {
      let confirm = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}`
      );
      if (confirm) {
        blogService.deleteBlog(blog.id);
        refreshBlogs();
      }
    };
    return (
      <button style={removeStyle} onClick={() => handleClick(blog)}>
        remove
      </button>
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Blogs</h2>
        {message && <Message message={message} setMessage={setMessage} />}
        <h2>Log in to application</h2>
        <Togglable buttonLabel="Log in">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUserName={setUserName}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        {message && <Message message={message} setMessage={setMessage} />}
        <LoggedUser user={user} setUser={setUser} setMessage={setMessage} />
        <Togglable buttonLabel="new blog">
          <BlogForm createBlog={addBlog} setMessage={setMessage} />
        </Togglable>
        {blogs.map((blog) => {
          return (
            <div style={blogStyle} key={blog.id}>
              <Blog blog={blog} />
              <Togglable buttonLabel="view">
                {blog.url} <br />
                {blog.likes}
                <LikeButton className="likeButton" blog={blog} />
                <br />
                {user.name}
                <br />
                <DeleteButton blog={blog} />
                <br />
                <br />
              </Togglable>
            </div>
          );
        })}
      </div>
    );
  }
};

export default App;
