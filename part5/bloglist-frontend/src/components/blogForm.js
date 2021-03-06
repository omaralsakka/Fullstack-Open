import { useState } from "react";

const BlogForm = ({ createBlog, setMessage }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      id: Math.random() > 0.5,
    });
    setMessage({
      txt: `a new blog ${newTitle} by ${newAuthor} added`,
      type: 1,
    });
    setNewAuthor("");
    setNewTitle("");
    setNewUrl("");
  };

  return (
    <div className="formDiv">
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        title:
        <input
          className="title"
          type="text"
          id="title"
          value={newTitle}
          onChange={({ target }) => {
            setNewTitle(target.value);
          }}
        />
        <br />
        author:
        <input
          type="text"
          id="author"
          value={newAuthor}
          onChange={({ target }) => {
            setNewAuthor(target.value);
          }}
        />
        <br />
        url:
        <input
          type="text"
          id="url"
          value={newUrl}
          onChange={({ target }) => {
            setNewUrl(target.value);
          }}
        />
        <br />
        <button id="create" type="submit">
          create
        </button>
      </form>
    </div>
  );
};
export default BlogForm;
