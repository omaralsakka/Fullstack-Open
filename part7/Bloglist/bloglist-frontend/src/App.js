import store from "./store";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "./components/loginForm";
import { loginSuccess } from "./reducers/loginReducer";
import { setToken } from "./services/loginServices";
import Profile from "./components/profile";

const App = () => {
  const dispatch = useDispatch();
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      dispatch(loginSuccess(user));
      setLoggedUser(user);
      setToken(user.token);
    }
  }, []);

  const unsubscribe = store.subscribe(() => {
    console.log("updatedState:", store.getState());
  });
  if (loggedUser) {
    return (
      <div className="container">
        <Profile />
      </div>
    );
  } else {
    return (
      <div className="container">
        <LoginForm />
      </div>
    );
  }
};

export default App;
