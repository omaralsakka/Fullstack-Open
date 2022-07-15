import store from "./store";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "./components/loginForm";
import { loginSuccess } from "./reducers/loginReducer";
import { setToken } from "./services/loginServices";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import useField from "./components/useField";
import { logUser } from "./reducers/loginReducer";
import { logoutUser } from "./reducers/loginReducer";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const [loggedUser, setLoggedUser] = useState("");
  const username = useField("text");
  const password = useField("password");

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      dispatch(loginSuccess(user));
      setLoggedUser(user);
      setToken(user.token);
    }
  }, []);

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

  const unsubscribe = store.subscribe(() => {
    console.log("updatedState:", store.getState());
  });

  return (
    <div className="container">
      {loggedUser ? (
        <div>
          <NavBar name={loggedUser.name} handleLogOut={handleLogOut} />
          <Home />
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
