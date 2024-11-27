import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../Navbar.css"

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <nav>
            <h1>Task Manager</h1>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
