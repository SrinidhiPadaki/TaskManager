import React, { useState } from 'react';
import { login } from '../api'; // assuming the login API call is correctly set up
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import '../Auth.css';  // Import Auth CSS

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate(); // React Router's navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Ensure both email and password are provided
        if (!formData.email || !formData.password) {
            alert("Please provide both email and password.");
            return;
        }
    
        try {
            // Send login request with formData
            const { data } = await login(formData);
    
            // Decode the JWT token to get the user ID
            const decodedToken = jwtDecode(data.token);
            const userId = decodedToken.id;  // Assuming 'id' is the user ID in the decoded token
    
            // Log the response for debugging
            console.log("Login successful:", data);
    
            // Store the token and user ID in sessionStorage
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('userId', userId);
    
            // Navigate to the dashboard after successful login
            navigate('/dashboard');
        } catch (error) {
            console.error("Login failed", error);
            alert('Login failed, please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="submit">Login</button>

            <p>
                Don't have an account?{' '}
                <a href="/register" style={{ textDecoration: 'none', color: '#007BFF' }}>Register here</a>
            </p>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <h3>Or Login with Google</h3>
                <a
                    href="http://localhost:5000/api/auth/google" // Replace with your back-end's Google login route
                    className="google-login-button"
                >
                    Login with Google
                </a>
            </div>
        </form>
    );
};

export default Login;
