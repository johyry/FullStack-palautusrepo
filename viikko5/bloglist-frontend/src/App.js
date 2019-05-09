import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import useField from './hooks/index';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const newBlogTitle = useField('text');
  const newBlogAuthor = useField('text');
  const newBlogUrl = useField('text');
  const username = useField('text');
  const password = useField('text');
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
        username: username.value,
        password: password.value,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userLog));

      blogService.setToken(user.token);
      setUser(userLog);
      password.emptyValue();
      username.emptyValue();
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
        title: newBlogTitle.value,
        author: newBlogAuthor.value,
        url: newBlogUrl.value,
      });

      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(newBlog));
      newBlogTitle.emptyValue();
      newBlogAuthor.emptyValue();
      newBlogUrl.emptyValue();
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
            username={username.value}
            password={password.value}
            handleUsernameChange={username.onChange}
            handlePasswordChange={password.onChange}
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
          newBlogTitle={newBlogTitle.value}
          newBlogAuthor={newBlogAuthor.value}
          newBlogUrl={newBlogUrl.value}
          handleBlogTitleChange={newBlogTitle.onChange}
          handleBlogAuthorChange={newBlogAuthor.onChange}
          handleBlogUrlChange={newBlogUrl.onChange}
          handleSubmit={handleAddNewBlog}
        />
      </Togglable>

      <h2>blogs</h2>
      {user === '' ? (
        <div>
          <p>Log in to view blogs.</p>
        </div>
      ) : (
        <Blogs
          blogs={blogs}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      )}
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
