import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    
    if (!emailRegex.test(email)) {
      setErr("Invalid email format. Domain extension must be 2 or 3 characters, and no uppercase letters.");
      setTimeout(() => setErr(""), 3000);
      return false;
    }
    setErr("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setLoading(true);
    const user = { email, password };

    try {
      const res = await axios.post(`${API_KEY}auth/login`, user);
      console.log(res.data);
      setSuccess(true);
      setEmail("");
      setPassword("");
      setErr("");
      setTimeout(() => setSuccess(""), 3000);
      setTimeout(() => navigate("/"), 3000);
     
      
     
    } catch (error) {
      // console.error("Error:", error);
      if(error.response){
        setErr(error.response.data.error)
      }
      setTimeout(() => setErr(""), 3000);
      // console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="title">Login</h1>

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
            {loading ? "Logging in..." : "Login"}
          </button>
          
            {err && <span className="error">{err}</span>}
          {success && <span className="success">Login successful...!</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
