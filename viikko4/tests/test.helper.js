const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'HTML on helppoa',
    author: 'Mikke Mäenpää',
    url: 'www.htmlonhelppoa.com',
    likes: 10
  },
  {
    title: 'Tämä on esimerkkiblogi',
    author: 'Esko Esimerkki',
    url: 'www.esimerkkiesko.com',
    likes: 32
  }
];

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' });
  await blog.save();
  await blog.remove();

  return blog.id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
};
