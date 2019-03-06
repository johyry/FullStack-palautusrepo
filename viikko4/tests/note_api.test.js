const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test.helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.remove({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('when there is initially some blogs saved', async () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const blogs = await helper.blogsInDb();

    expect(blogs.length).toBe(helper.initialBlogs.length);
  });
});

describe('addition of a new blog', async () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Tämä on uusi blogi',
      author: 'Esko Uusitalo',
      url: 'www.123456789.com',
      likes: 1
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
    const titles = blogsAtEnd.map(r => r.title);

    expect(titles).toContain('Tämä on uusi blogi');
  });

  test('a blog with undefined likes will have 0 likes', async () => {
    const newBlog = {
      title: 'Tämä on uusi blogi',
      author: 'Esko Uusitalo',
      url: 'www.123456789.com'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body[2].likes).toBe(0);
  });

  test('adding a new blog with undefined title will cause 400', async () => {
    const newBlog = {
      author: 'Esko Uusitalo',
      url: 'www.123456789.com'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });

  test('adding a new blog with undefined url will cause 400', async () => {
    const newBlog = {
      title: 'blogiwhtoutURL',
      author: 'Esko Uusitalo'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
});

test('blogs are identified by field named id, not _id', async () => {
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
