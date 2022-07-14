import { Form, Button } from "react-bootstrap";
import useField from "./useField";
import { useDispatch } from "react-redux";
import { logUser } from "../reducers/loginReducer";

const LoginForm = () => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(logUser(username.value, password.value));
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control {...username} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control {...password} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
