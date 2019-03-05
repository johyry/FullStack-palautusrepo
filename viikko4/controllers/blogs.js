const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;
  if (body.likes === undefined) body.likes = 0;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  });
  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
