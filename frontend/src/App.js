import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Login from './pages/login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskView from './components/TaskView'; 
import HandleGoogleRedirect from './pages/HandleGoogleRedirect';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('token'));
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        if (token && userId) {
            setIsAuthenticated(!!sessionStorage.getItem('token')); 
        } else {
            setIsAuthenticated(!!sessionStorage.getItem('token')); 
        }
        setLoading(false);
    }, []);

   
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <DndProvider backend={HTML5Backend}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/auth/google/callback"
                        element={<HandleGoogleRedirect />} 
                    />
                    <Route
                        path="/dashboard"
                        element={isAuthenticated ===true? <Dashboard /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/tasks/:id"
                        element={isAuthenticated ===true? <TaskView /> : <Navigate to="/login" />}
                    />                    
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </DndProvider>
        </Router>
    );
};

export default App;
