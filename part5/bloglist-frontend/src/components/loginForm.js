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
export default LoginForm;
