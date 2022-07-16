import useField from "./useField";
import Togglable from "./Togglable";
import { Button, Form } from "react-bootstrap";
import { createBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";

const BlogForm = ({ blogs, setBlogs }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const dispatch = useDispatch();

  const clearInputs = (e) => {
    e.preventDefault();
    title.onChange(e);
    author.onChange(e);
    url.onChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
    };
    dispatch(createBlog(newBlog))
      .then((response) => {
        setBlogs(blogs.concat(response));
      })
      .then(() => {
        e.target.value = "";
        clearInputs(e);
      });
  };

  return (
    <Togglable buttonLable="create new" cancelButtonLabel="hide">
      <Form className="my-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>title</Form.Label>
          <Form.Control {...title}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>author</Form.Label>
          <Form.Control {...author}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>url</Form.Label>
          <Form.Control {...url}></Form.Control>
        </Form.Group>
        <Button type="submit" value="">
          save
        </Button>{" "}
        <Button type="reset" value="" onClick={(e) => clearInputs(e)}>
          cancel
        </Button>
      </Form>
    </Togglable>
  );
};

export default BlogForm;
