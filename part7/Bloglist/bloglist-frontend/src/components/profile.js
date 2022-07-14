import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.login.user);
  return <div>{user.name}</div>;
};

export default Profile;
