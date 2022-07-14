import store from "./store";
import { useDispatch } from "react-redux";
import { logUser } from "./reducers/loginReducer";

const App = () => {
  const dispatch = useDispatch();
  console.log("initialState:", store.getState());
  dispatch(logUser("elee", "123456"));
  store.subscribe(() => {
    console.log("updatedState:", store.getState());
  });
  return <div className="App"></div>;
};

export default App;
