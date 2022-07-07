const Blog = ({ blog, LikeButton }) => {
  return (
    <div>
      {blog.title} {blog.author} <br />
      {blog.url} <br />
      {blog.likes}
      <button onClick={() => LikeButton(blog)}>like</button> <br />
      <br />
    </div>
  );
};

export default Blog;
