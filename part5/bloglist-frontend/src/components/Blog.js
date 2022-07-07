const Blog = ({ blog }) => {
  return (
    <div className="blog">
      {blog.title} {blog.author} <br />
    </div>
  );
};

export default Blog;
