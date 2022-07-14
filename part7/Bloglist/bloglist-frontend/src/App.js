import store from "./store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "./components/loginForm";
import { loginSuccess } from "./reducers/loginReducer";
import { setToken } from "./services/loginServices";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      dispatch(loginSuccess(user));
      setToken(user.token);
    }
  }, []);

  console.log("initialState:", store.getState());
  const unsubscribe = store.subscribe(() => {
    console.log("updatedState:", store.getState());
  });
  return (
    <div className="container">
      <LoginForm />
    </div>
  );
};

export default App;
