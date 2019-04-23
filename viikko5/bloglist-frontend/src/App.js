import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogName, setNewBlogName] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogsList => setBlogs(blogsList));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const userLog = JSON.parse(loggedUserJSON);
      setUser(userLog);
      blogService.setToken(userLog.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const userLog = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userLog));

      blogService.setToken(user.token);
      setUser(userLog);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  );

  const addBlog = async event => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create({
        title: newBlogName,
        author: newBlogAuthor,
        url: newBlogUrl,
      });

      setBlogs(blogs.concat(newBlog));
      setNewBlogName('');
      setNewBlogAuthor('');
      setNewBlogUrl('');
    } catch (exception) {
      setErrorMessage('adding blog unsuccessful');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Name:
        <input
          value={newBlogName}
          onChange={({ target }) => setNewBlogName(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <input
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser('');
  };

  return (
    <div>
      <Notification message={errorMessage} />

      <h2>Log In</h2>

      {user === '' ? (
        loginForm()
      ) : (
        <div>
          <p>{user.username} logged in</p>
          <button type="button" onClick={logOut}>
            log out
          </button>
          <h3>New blog</h3>
          {blogForm()}
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
