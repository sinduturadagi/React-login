import React, { useState } from 'react';
import './LoginForm.css';
import { FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const usernameRegex = /^[a-zA-Z]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const validate = () => {
    let validationErrors = {};

    if (!username.trim()) {
      validationErrors.username = 'Username is required';
    } else if (!usernameRegex.test(username)) {
      validationErrors.username = 'Username should contain only letters';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      validationErrors.password = 'Password must contain at least 6 characters, including uppercase, lowercase, and a number';
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', { username, password });
      navigate('/home'); 
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input type="text" placeholder='UserName' value={username} onChange={(e) => setUsername(e.target.value)} />
          <FaUser className='icon' />
          {errors.username && <span className='error'>{errors.username}</span>}
        </div>
        <div className='input-box'>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <FaLock className='icon' />
          {errors.password && <span className='error'>{errors.password}</span>}
        </div>
        <div className='remember-forgot'>
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href='#'>Forgot password?</a>
        </div>
        <button type="submit">Login</button>
        <div className='register-link'>
          <p>Don’t have an account? <Link to="/register">Register</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
