/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newURL, setNewURL] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [infoMessage, setInfoMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleURLChange = (event) => {
    setNewURL(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user),
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('wrong credentials!');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
    };

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setInfoMessage(`a new blog ${newTitle} by ${newAuthor} was added`);
        setTimeout(() => {
          setInfoMessage(null);
        }, 5000);
        setNewTitle('');
        setNewAuthor('');
        setNewURL('');
      }).catch(() => {
        setErrorMessage(
          'Invalid Input',
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
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
  );

  if (user === null) {
    return (

      <div>
        <h2>Log in to application</h2>
        <Notification error={errorMessage} info={null} />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification error={errorMessage} info={infoMessage} />
      <div>
        <p>
          {user.name}
          {' '}
          logged in
          {' '}
          <button onClick={handleLogout} type="submit">logout</button>
        </p>
        {blogForm()}
      </div>
      <h2>create new</h2>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
