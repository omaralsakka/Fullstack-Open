import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoggedUser from "./components/loggedUser";
import Message from "./components/message";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newBlog, setNewBlog] = useState("");

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

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      id: blogs.length + 1,
    };

    blogService.create(blogObject).then((returnedblog) => {
      setMessage({
        txt: `a new blog ${newTitle} by ${newAuthor} added`,
        type: 1,
      });
      setBlogs(blogs.concat(returnedblog));
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    });
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => {
            setUserName(target.value);
          }}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          name="Username"
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      title:
      <input
        type="text"
        value={newTitle}
        onChange={({ target }) => {
          setNewTitle(target.value);
        }}
      />
      <br />
      author:
      <input
        type="text"
        value={newAuthor}
        onChange={({ target }) => {
          setNewAuthor(target.value);
        }}
      />
      <br />
      url:
      <input
        type="text"
        value={newUrl}
        onChange={({ target }) => {
          setNewUrl(target.value);
        }}
      />
      <br />
      <button type="submit">create</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        {message && <Message message={message} setMessage={setMessage} />}
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        {message && <Message message={message} setMessage={setMessage} />}
        <LoggedUser user={user} setUser={setUser} setMessage={setMessage} />
        {blogForm()}
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
