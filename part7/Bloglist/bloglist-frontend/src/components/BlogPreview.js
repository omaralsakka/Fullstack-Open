import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { addLike } from "../reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getBlog } from "../services/blogServices";
import Comments from "./commentsForm";

const BlogPreview = () => {
  const paramId = useParams().id;
  const dispatch = useDispatch();
  const [blog, setBlog] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const blogOwner = useSelector((state) => state.users.users).find((user) => {
    return user.id === blog.user;
  });
  useEffect(() => {
    getBlog(paramId).then((response) => {
      setBlog(response);
      setIsLoading(false);
    });
  }, [paramId]);

  const handleLike = () => {
    let newObj = Object.assign({}, blog);
    newObj.likes += 1;
    dispatch(addLike(blog.id, newObj));
    setBlog(newObj);
  };

  if (isLoading) {
    return <div></div>;
  } else {
    return (
      <div>
        <h2>{blog.title}</h2>
        <div className="my-5 p-2 border  ">
          <a href={blog.url} target="__blank">
            {blog.url}
          </a>
          <br />
          {blog.likes} likes
          <Button onClick={() => handleLike()} className="mx-2">
            like
          </Button>
          <p>added by {blogOwner.name}</p>
        </div>

        <Comments blog={blog} setBlog={setBlog} />
      </div>
    );
  }
};

export default BlogPreview;
