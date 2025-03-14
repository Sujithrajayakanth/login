import { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            const res = await axios.post('http://localhost:5000/login', { email, password });
            setMessage(res.data.message);
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage(err.response.data.error);
            } else {
                setMessage('Network error or server is unreachable.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign In</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button type="submit">Sign In</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default Login;
