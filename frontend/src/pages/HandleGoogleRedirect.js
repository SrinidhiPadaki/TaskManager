import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HandleGoogleRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const userId = params.get('userId'); // Capture userId

        if (token && userId) {
            
            // Store the token and userId in sessionStorage
            sessionStorage.setItem('token', token); 
            sessionStorage.setItem('userId', userId);

             
           setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } else {
            // If no token or userId, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default HandleGoogleRedirect;
