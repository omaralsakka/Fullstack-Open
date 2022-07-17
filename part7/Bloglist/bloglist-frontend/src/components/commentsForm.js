import { Form, Button } from "react-bootstrap";
import Togglable from "./Togglable";
import useField from "./useField";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogsReducer";

const Comments = ({ blog, setBlog }) => {
  const dispatch = useDispatch();
  const newComment = useField("text");

  const handleComment = (e) => {
    e.preventDefault();

    let newObj = Object.assign({}, blog);
    newObj.comments.push(newComment.value);
    dispatch(addComment(blog.id, newObj));
    e.target.value = "";
    newComment.onChange(e);
    setBlog(newObj);
  };
  return (
    <div className="my-5 p-2 border  ">
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => {
          return <li key={blog.comments.indexOf(comment)}>{comment}</li>;
        })}
      </ul>

      <Togglable buttonLable="add comment" cancelButtonLabel="cancel">
        <Form className="my-4" onSubmit={handleComment}>
          <Form.Group className="mb-3">
            <Form.Label>title</Form.Label>
            <Form.Control {...newComment}></Form.Control>
          </Form.Group>
          <Button type="submit" value="">
            save
          </Button>
        </Form>
      </Togglable>
    </div>
  );
};

export default Comments;
