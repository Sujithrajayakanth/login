import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const API_KEY = process.env.REACT_APP_BASE_URL;

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    if (!emailRegex.test(email)) {
      setErr('Invalid email format. Domain extension must be 2 or 3 characters.');
      setTimeout(() => setErr(''), 3000);
      return false;
    }
    setErr('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, password, email);

    if (!validateEmail(email)) return;

    setLoading(true);
    setErr('');
    setSuccess(false);

    const user = { name, email, password };

    try {
      const res =  await axios.post(`${API_KEY}auth/register`, user);
      console.log(res.data)
      if(res.data === "User already exists. Please use a different email."){
        setSuccess(false)
       setErr(res.data)
       setTimeout(() => setErr(''),3000)
      }else{
        setSuccess(true)
       setTimeout(() => navigate('/login'),3000)
      }
      // setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.log( error);
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="title">Register</h1>

          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="input"
            name="username"
            minLength="3"
            maxLength="20"
            pattern="^[a-zA-Z0-9_]+$"
            title="Username must be between 3-20 characters and can only contain letters, numbers, and underscores."
            placeholder="Enter your username"
          />

          <input
            type="email"
            required
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            name="email"
            minLength="6"
            maxLength="50"
            title="Please enter a valid email address (e.g., example@gmail.com)"
          />

          <input
            type="password"
            className="input"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter Your password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$"
            title="Password must be between 8-20 characters and include at least one lowercase letter, one uppercase letter, one number, and one special character."
          />

          <button className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
            {err ? err && <span className="error">{err}</span> : success && <span className="success">Registration successful...!</span>}
        </form>
      </div>
    </div>
  );
};

export default Register;
