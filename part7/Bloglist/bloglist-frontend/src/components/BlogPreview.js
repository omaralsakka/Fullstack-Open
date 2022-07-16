import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogPreview = () => {
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.blogs).find(
    (blog) => blog.id === id
  );
  return (
    <div>
      <h2>{blog.title}</h2>
      <br />
      <a href={blog.url} target="__blank">
        {blog.url}
      </a>
      <p>{blog.likes} likes</p>
      <p>added by {blog.user.name}</p>
      <br />
      <h3>comments</h3>
      <ul>
        <li>comment 1</li>
        <li>comment 2</li>
      </ul>
    </div>
  );
};

export default BlogPreview;
