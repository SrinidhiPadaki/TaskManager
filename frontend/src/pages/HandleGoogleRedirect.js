import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HandleGoogleRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const userId = params.get('userId'); // Capture userId

        if (token && userId) {
            console.log('Token:', token);
            console.log('User ID:', userId);

            // Store the token and userId in sessionStorage
            sessionStorage.setItem('token', token); 
            sessionStorage.setItem('userId', userId);

            // Verify that the values are stored correctly
            console.log('Stored Token:', sessionStorage.getItem('token'));
            console.log('Stored User ID:', sessionStorage.getItem('userId'));

            // Redirect to dashboard after storing token and userId
            navigate('/dashboard');
        } else {
            // If no token or userId, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    return <div>Loading...</div>;
};

export default HandleGoogleRedirect;
