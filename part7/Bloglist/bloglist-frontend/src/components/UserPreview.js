import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { Blogs } from "./Home";

const UserPreview = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.users.users).find(
    (user) => user.id === id
  );
  return (
    <div>
      <br />
      <h1>{user.name}</h1>
      <br />
      <h3>added blogs</h3>
      <Blogs blogs={user.blogs} />
      {/* <ListGroup>
        {user.blogs.map((blog) => {
          return <ListGroup.Item key={blog.title}>{blog.title}</ListGroup.Item>;
        })}
      </ListGroup> */}
    </div>
  );
};

export default UserPreview;
