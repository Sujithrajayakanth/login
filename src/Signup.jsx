import { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import {useNavigate} from 'react-router-dom';


const Signup = () => {
    const [name, setName ] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userExists, setUserExists] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {   
        e.preventDefault();
        const value = {name,email, password}
        console.log(value)
        try {
          const res = await axios.post('http://localhost:5000/signup',value );
          setMessage(res.data.message);
        
        if (res.data.message === 'Credentials already registered. Use new credentials to register.') {
            setUserExists(true); // If user exists, show login link
            } else {
                setUserExists(false); // If new user, hide login link
            }
    }
       
     catch (err) {
         console.log(err)
        
        }
      };
      
    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                {message && <p className="message">{message}</p>}
                {/* {userExists && (
                    <p className="login-link">
                        Credentials already registered. Use new credentials to register.
                    </p>
                )} */}

                <form  onSubmit={handleSubmit} >
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
        

                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <p className="bottom-login-link">
                    Already have an account? <a href="/login">Go to Login Page</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;







          

    