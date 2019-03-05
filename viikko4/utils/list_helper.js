const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);
  return total;
};

const favouriteBlog = blogs => {
  const favourite = blogs.reduce((fav, blog) => {
    if (blog.likes > fav) return blog.likes;
    return fav;
  }, 0);
  return blogs.find(blog => blog.likes === favourite);
};

const mostBlogs = blogs => {
  const map = new Map();
  const mostBlogss = blogs.reduce((most, blog) => {
    if (map.has(blog.author)) {
      map.set(blog.author, map.get(blog.author) + 1);
    } else {
      map.set(blog.author, 1);
    }

    if (map.get(blog.author) > most) return map.get(blog.author);
    return most;
  }, 0);

  for (let [k, v] of map) {
    if (v === mostBlogss) {
      return { author: k, blogs: v };
    }
  }
  return {};
};

const mostLikes = blogs => {
  const map = new Map();
  const mostLikess = blogs.reduce((most, blog) => {
    if (map.has(blog.author)) {
      map.set(blog.author, map.get(blog.author) + blog.likes);
    } else {
      map.set(blog.author, blog.likes);
    }

    if (map.get(blog.author) > most) return map.get(blog.author);
    return most;
  }, 0);

  for (let [k, v] of map) {
    if (v === mostLikess) {
      return { author: k, likes: v };
    }
  }
  return {};
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};
