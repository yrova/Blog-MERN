/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [updateBlog, setUpdatedBlog] = useState(blog);

  const handleBlogUpdate = (update) => {
    setUpdatedBlog(update);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const updateLike = () => {
    const newBlog = { ...updateBlog };
    newBlog.likes += 1;
    blogService.update(newBlog.id, newBlog);
    handleBlogUpdate(newBlog);
  };

  const deleteBlog = () => {
    const message = `Remove Blog ${updateBlog.title} by ${updateBlog.author}`;
    // eslint-disable-next-line no-alert
    if (window.confirm(message)) {
      blogService.removeBlog(updateBlog.id);
      window.location.reload();
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogDetails = () => (
    <div>
      <p>{updateBlog.url}</p>
      <p>
        likes
        {' '}
        {updateBlog.likes}
        {' '}
        <button type="button" onClick={updateLike}>like</button>
      </p>
      <p>{updateBlog.user.name}</p>
      <button type="button" onClick={deleteBlog}>remove</button>
    </div>
  );

  return (
    <div style={blogStyle}>
      <div>
        {updateBlog.title}
        {' '}
        {updateBlog.author}
        {' '}
        <button type="button" onClick={toggleDetails}>{(showDetails) ? 'hide' : 'view'}</button>
        {showDetails && blogDetails()}
      </div>
    </div>
  );
};

export default Blog;
