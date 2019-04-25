import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogName, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const blogFormRef = React.createRef();

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

  const handleLike = async ({ blog }) => {
    blog.likes += 1;

    try {
      await blogService.editBlog({ blog });
      setBlogs(
        blogs.map(unit => {
          if (unit.id === blog.id) {
            return blog;
          }
          return unit;
        })
      );
    } catch (exception) {
      setErrorMessage('Adding like unsuccessful');
    }
  };

  const handleDelete = async ({ blog }) => {
    try {
      await blogService.deleteBlog({ blog });
      setBlogs(blogs.filter(unit => unit.id !== blog.id));
    } catch (exception) {
      setErrorMessage('Deleting blog unsuccessful');
    }
  };

  const handleAddNewBlog = async event => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create({
        title: newBlogName,
        author: newBlogAuthor,
        url: newBlogUrl,
      });

      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(newBlog));
      setNewBlogTitle('');
      setNewBlogAuthor('');
      setNewBlogUrl('');
    } catch (exception) {
      setErrorMessage('adding blog unsuccessful');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser('');
  };

  return (
    <div>
      <Notification message={errorMessage} />

      {user === '' ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
            handleLogOut={handleLogOut}
          />
        </Togglable>
      ) : (
        <div>
          <p>{user.username} logged in</p>
          <button onClick={handleLogOut}>Log out </button>
        </div>
      )}

      <h2>Create new blog</h2>

      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <NewBlogForm
          newBlogName={newBlogName}
          newBlogAuthor={newBlogAuthor}
          newBlogUrl={newBlogUrl}
          handleBlogTitleChange={({ target }) => setNewBlogTitle(target.value)}
          handleBlogAuthorChange={({ target }) =>
            setNewBlogAuthor(target.value)
          }
          handleBlogUrlChange={({ target }) => setNewBlogUrl(target.value)}
          handleSubmit={handleAddNewBlog}
        />
      </Togglable>

      <h2>blogs</h2>
      <Blogs
        blogs={blogs}
        handleLike={handleLike}
        handleDelete={handleDelete}
        user={user}
      />
    </div>
  );
};

const Blogs = ({ blogs, handleLike, handleDelete, user }) => {
  const sorted = blogs.sort((a, b) => b.likes - a.likes);

  return sorted.map(blog => (
    <Blog
      key={blog.id}
      blog={blog}
      handleLike={handleLike}
      handleDelete={handleDelete}
      user={user}
    />
  ));
};

export default App;
