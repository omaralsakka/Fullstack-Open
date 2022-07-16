import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { addLike } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getBlog } from "../services/blogServices";

const BlogPreview = () => {
  const paramId = useParams().id;
  const dispatch = useDispatch();
  const [blog, setBlog] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBlog(paramId).then((response) => {
      setBlog(response);
      setIsLoading(false);
    });
  }, [paramId]);

  const handleLike = (id, blog) => {
    let newObj = Object.assign({}, blog);
    newObj.likes += 1;
    dispatch(addLike(id, newObj));
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
          <Button onClick={() => handleLike(blog.id, blog)} className="mx-2">
            like
          </Button>
          <p>added by {blog.user.name}</p>
        </div>

        <div className="my-5 p-2 border  ">
          <h3>comments</h3>
          <ul>
            <li>comment 1</li>
            <li>comment 2</li>
          </ul>
        </div>
      </div>
    );
  }
};

export default BlogPreview;
