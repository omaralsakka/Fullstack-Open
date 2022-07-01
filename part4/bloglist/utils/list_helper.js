const dummy = (blogs) => {
  return blogs ? 1 : 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  let maxLikes = blogs.reduce((max, blog) => {
    return max > blog.likes ? max : (max = blog.likes);
  }, 0);
  return blogs.find((elem) => {
    return elem.likes === maxLikes;
  });
};

const mostBlogs = (blogs) => {
  let count = {};
  blogs.forEach((blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1;
  });
  const values = Math.max(...Object.values(count));
  const author = Object.keys(count).find((key) => count[key] === values);
  return { author: author, blogs: values };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
