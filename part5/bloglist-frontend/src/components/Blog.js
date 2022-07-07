let blogStyle = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "10%",
  backgroundColor: "rgb(228, 239, 176)",
  border: "1px solid black",
  borderRadius: "5px",
  padding: "5px",
  marginBottom: "5px",
};

let buttonStyle = {
  cursor: "pointer",
  width: "30%",
};

let removeStyle = {
  cursor: buttonStyle.cursor,
  width: buttonStyle.width,
  backgroundColor: "rgb(17, 134, 212)",
  borderRadius: "5px",
  border: "none",
  color: "white",
  padding: "5px",
};

const Blog = ({ blog, LikeButton, name, DeleteButton }) => {
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <br />
      {blog.url} <br />
      {blog.likes}
      <button style={buttonStyle} onClick={() => LikeButton(blog)}>
        like
      </button>{" "}
      <br />
      {name} <br />
      <button style={removeStyle} onClick={() => DeleteButton(blog)}>
        remove
      </button>
      <br />
      <br />
    </div>
  );
};

export default Blog;
