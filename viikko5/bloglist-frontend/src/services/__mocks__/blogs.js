const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML on helppoa',
    author: 'Testaaja.',
    date: '2019-01-28T16:38:15.541Z',
    url: 'www.testurl.com',
    likes: 1,
    user: {
      _id: '5cb8267b8f5d5122b991891c',
      username: 'oukkei',
      name: 'Matti Luukkainen',
    },
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Selain pystyy suorittamaan vain javascriptiä',
    author: 'Testaaja.',
    date: '2019-01-28T16:38:57.694Z',
    url: 'www.urltest.com',
    user: {
      _id: '5cb8267b8f5d5122b991891c',
      username: 'oukkei',
      name: 'Matti Luukkainen',
    },
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    author: 'Testaaja.',
    date: '2019-01-28T16:39:12.713Z',
    url: 'www.testurlurl.com',
    user: {
      _id: '5cb8267b8f5d5122b991891c',
      username: 'oukkei',
      name: 'Matti Luukkainen',
    },
  },
];

const getAll = () => {
  return Promise.resolve(blogs);
};

const setToken = () => {
  return '';
};

export default { getAll, setToken };
