import React, { useState } from 'react';

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const showWhenVisible = { display: visible ? '' : 'none' };

  const confirmDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDelete({ blog });
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle} className="blog">
      <div onClick={toggleVisibility} className="showContentButton">
        Title: {blog.title} By: {blog.author}
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <ul>
          <li>{blog.url}</li>
          <li>
            {blog.likes}{' '}
            <button onClick={() => handleLike({ blog })}>like</button>
          </li>
          {blog.user.username === user.username ? (
            <li>
              <button onClick={confirmDelete}>delete</button>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
