/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [infoMessage, setInfoMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = React.createRef();

  // Populate Blogs sections with blogs sorted by the highest number of likes
  useEffect(() => {
    // eslint-disable-next-line no-shadow
    blogService.getAll().then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  // Get token from browser and set Token for headers
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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

  const updateLike = (id) => {
    const newBlog = blogs.find(b => b.id === id);
    const changedBlog = {
      ...newBlog
    };

    changedBlog.likes += 1;

    blogService
      .update(newBlog.id, changedBlog)
      .then(() => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))
      })
  };

  const deleteBlog = (id) => {
    const removeBlog = blogs.find(b => b.id === id);
    const message = `Remove Blog ${removeBlog.title} by ${removeBlog.author}`;
    // eslint-disable-next-line no-alert
    if (window.confirm(message)) {
      blogService
        .removeBlog(id)
        .then((message) => {
          setBlogs(blogs.filter(blog => blog.id !== id))
        })
    }
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setInfoMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} was added`);
        setTimeout(() => {
          setInfoMessage(null);
        }, 5000);
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
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );


  return (
    <div>
      <h2>blogs</h2>
      <Notification error={errorMessage} info={infoMessage} />
      {user === null
        ? loginForm()
        : (
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
        )}

      {blogs.map((blog) => <Blog key={blog.id} blog={blog} updateLike={() => updateLike(blog.id)} deleteBlog={() => deleteBlog(blog.id)} />)}
    </div>
  );
};

export default App;
