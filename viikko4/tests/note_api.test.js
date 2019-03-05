const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

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

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(initialBlogs.length);
});

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

  const response = await api.get('/api/blogs');

  const titles = response.body.map(r => r.title);

  expect(response.body.length).toBe(initialBlogs.length + 1);
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

test('blogs are identified by field named id, not _id', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].id).toBeDefined();
});

beforeEach(async () => {
  await Blog.deleteMany({});

  let noteObject = new Blog(initialBlogs[0]);
  await noteObject.save();

  noteObject = new Blog(initialBlogs[1]);
  await noteObject.save();
});

afterAll(() => {
  mongoose.connection.close();
});
