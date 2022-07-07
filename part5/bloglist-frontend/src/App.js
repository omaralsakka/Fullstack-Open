import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoggedUser from "./components/loggedUser";
import Message from "./components/message";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/blogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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

  const LikeButton = (blog) => {
    let newObj = blog;
    newObj.likes += 1;
    blogService.likeBlog(newObj.id, newObj);
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  if (user === null) {
    return (
      <div>
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
        <h2>blogs</h2>
        {message && <Message message={message} setMessage={setMessage} />}
        <LoggedUser user={user} setUser={setUser} setMessage={setMessage} />
        <Togglable buttonLabel="new blog">
          <BlogForm createBlog={addBlog} setMessage={setMessage} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} LikeButton={LikeButton} />
        ))}
      </div>
    );
  }
};

export default App;
