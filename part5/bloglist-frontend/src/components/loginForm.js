import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  username,
  setUserName,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        id="username"
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
        id="password"
        value={password}
        name="Username"
        onChange={({ target }) => {
          setPassword(target.value);
        }}
      />
    </div>
    <button id="login-button" type="submit">
      login
    </button>
  </form>
);

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default LoginForm;
