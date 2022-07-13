import { Form, Button } from "react-bootstrap";
import { loginUser } from "../reducers/loginReducer";
import useField from "./useField";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const content = {
      username: username.value,
      password: password.value,
    };
    dispatch(loginUser(content));
  };
  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control {...username} />
          <Form.Label>password:</Form.Label>
          <Form.Control {...password} />
          <br />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
