const BlogForm = ({
  addBlog,
  newTitle,
  setNewTitle,
  newAuthor,
  setNewAuthor,
  newUrl,
  setNewUrl,
}) => (
  <div>
    <h2>Create new</h2>
    <form onSubmit={addBlog}>
      title:
      <input
        type="text"
        value={newTitle}
        onChange={({ target }) => {
          setNewTitle(target.value);
        }}
      />
      <br />
      author:
      <input
        type="text"
        value={newAuthor}
        onChange={({ target }) => {
          setNewAuthor(target.value);
        }}
      />
      <br />
      url:
      <input
        type="text"
        value={newUrl}
        onChange={({ target }) => {
          setNewUrl(target.value);
        }}
      />
      <br />
      <button type="submit">create</button>
    </form>
  </div>
);

export default BlogForm;
