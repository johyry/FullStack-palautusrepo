import React from 'react';

const NewBlogForm = ({
  handleSubmit,
  handleBlogTitleChange,
  handleBlogAuthorChange,
  handleBlogUrlChange,
  newBlogName,
  newBlogAuthor,
  newBlogUrl,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      Name:
      <input value={newBlogName} onChange={handleBlogTitleChange} />
    </div>
    <div>
      Author:
      <input value={newBlogAuthor} onChange={handleBlogAuthorChange} />
    </div>
    <div>
      Url:
      <input value={newBlogUrl} onChange={handleBlogUrlChange} />
    </div>
    <button type="submit">Save</button>
  </form>
);

export default NewBlogForm;
