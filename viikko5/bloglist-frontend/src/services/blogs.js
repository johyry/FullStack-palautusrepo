import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const editBlog = async ({ blog }) => {
  const blogUrl = `${baseUrl}/${blog.id}`;
  const response = await axios.put(blogUrl, blog);
  return response.data;
};

const deleteBlog = async ({ blog }) => {
  const config = {
    headers: { Authorization: token },
  };

  const blogUrl = `${baseUrl}/${blog.id}`;
  const response = await axios.delete(blogUrl, config);
  console.log(response.data);
  return response.data;
};

export default { getAll, create, setToken, editBlog, deleteBlog };
