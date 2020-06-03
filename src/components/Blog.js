/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const Blog = ({ blog, updateLike, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogDetails = () => (
    <div className='blog-details'>
      <ul>
        <li>URL:{' '}{blog.url}</li>
        <li>
          Likes:{' '}{blog.likes}{' '}
          <button type="button" onClick={updateLike}>like</button>
        </li>
        <li>Name: {' '}{blog.user.name}</li>
      </ul>
      <button type="button" onClick={deleteBlog}>remove</button>
    </div>
  );

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title}
        {' '}
        by
        {' '}
        {blog.author}
        {' '}
        <button type="button" onClick={toggleDetails}>{(showDetails) ? 'hide' : 'view'}</button>
        {showDetails && blogDetails()}
      </div>
    </div>
  );
};

export default Blog;
