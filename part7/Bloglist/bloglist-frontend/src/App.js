// import store from "./store";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import useField from "./components/useField";
import Users from "./components/Users";
import BlogPreview from "./components/BlogPreview";
import UserPreview from "./components/UserPreview";
import { setToken } from "./services/blogServices";
import { loginSuccess } from "./reducers/loginReducer";
import { logUser, logoutUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  const [loggedUser, setLoggedUser] = useState("");
  const username = useField("text");
  const password = useField("password");

  // for fetching blogs
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      dispatch(loginSuccess(user));
      setLoggedUser(user);
      setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(logUser(username.value, password.value)).then((response) => {
        setLoggedUser(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    try {
      dispatch(logoutUser()).then(() => {
        setLoggedUser("");
      });
    } catch (error) {
      console.log("logout error:", error);
    }
  };

  return (
    <div className="container">
      {loggedUser ? (
        <div>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <NavBar name={loggedUser.name} handleLogOut={handleLogOut} />
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/blogs/:id" element={<BlogPreview />} />
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<UserPreview />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      ) : (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
