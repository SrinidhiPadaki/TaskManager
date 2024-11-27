import React, { useState } from 'react';
import { register } from '../api';
import { useNavigate } from 'react-router-dom';
import '../Auth.css';  // Import Auth CSS


const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(formData);
        navigate('/login');
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
            <button type="submit">Register</button>

            <p>
                Already have an account?{' '}
                <a href="/login" style={{ textDecoration: 'none', color: '#007BFF' }}>Login here</a>
            </p>

            
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <h3>Or Sign up with Google</h3>
                <a
                    href="https://taskmanager-cfr7.onrender.com/api/auth/google" // Replace with your back-end's Google login route
                    className="google-login-button"
                >
                    Sign up with Google
                </a>
            </div>
        </form>
    );
};

export default Register;
