const LoggedUser = ({ user, setUser }) => {
  console.log("This is user in logged file", user.name);
  return (
    <div>
      {user.name} logged in
      <button onClick={() => setUser(null)}>logout</button>
      <br />
      <br />
    </div>
  );
};

export default LoggedUser;
