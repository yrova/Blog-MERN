/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newURL, setNewURL] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleURLChange = (event) => {
    setNewURL(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,
    });

    setNewTitle('');
    setNewAuthor('');
    setNewURL('');
  };

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          URL:
          <input
            value={newURL}
            onChange={handleURLChange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
