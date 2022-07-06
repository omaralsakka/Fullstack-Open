const handleLogOut = (setUser, setMessage) => {
  const msg = { txt: "logged out", type: 1 };
  window.localStorage.clear();
  setUser(null);
  setMessage(msg);
};

const LoggedUser = ({ user, setUser, setMessage }) => {
  return (
    <div>
      {user.name} logged in
      <button onClick={() => handleLogOut(setUser, setMessage)}>logout</button>
      <br />
      <br />
    </div>
  );
};

export default LoggedUser;
