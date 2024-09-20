import React, { useState } from 'react';
import './RegistrationForm.css';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      console.log('RegistrationForm successful:', { username, password });
      navigate('/home'); // Redirect to home page on successful registration
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
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
        <div className='input-box'>
          <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <FaLock className='icon' />
          {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
