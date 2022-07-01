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

module.exports = { dummy, totalLikes, favoriteBlog };
