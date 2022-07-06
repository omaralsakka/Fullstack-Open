import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoggedUser from "./components/loggedUser";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [newBlog, setNewBlog] = useState("");
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const Message = () => {
    if (message) {
      let C = message.type > 1 ? "red" : "green";
      const messageStyle = {
        color: C,
        fontStyle: "italic",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      };
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      return <div style={messageStyle}>{message.txt}</div>;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      const Msg = { txt: "Logged in", type: 1 };
      setMessage(Msg);
      setUser(user);
      setUserName("");
      setPassword("");
    } catch (exception) {
      const Msg = { txt: "Wrong credentials", type: 2 };
      setMessage(Msg);
      return (
        <>
          <h1>Wrong Credintials</h1>
        </>
      );
    }
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

  // const blogForm = () => (
  //   <form onSubmit={addBlog}>
  //     <input value={newBlog} onChange={handleBlogChange} />
  //     <button type="submit">save</button>
  //   </form>
  // );
  if (user === null) {
    return (
      <div>
        <Message />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Message />
        <LoggedUser user={user} setUser={setUser} />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
