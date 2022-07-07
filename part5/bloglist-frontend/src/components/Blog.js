const Blog = ({ blog, LikeButton, name }) => {
  return (
    <div>
      {blog.title} {blog.author} <br />
      {blog.url} <br />
      {blog.likes}
      <button onClick={() => LikeButton(blog)}>like</button> <br />
      {name} <br />
      <br />
    </div>
  );
};

export default Blog;
