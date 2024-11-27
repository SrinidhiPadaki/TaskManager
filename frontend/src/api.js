import axios from 'axios';

const API = axios.create({
    baseURL: 'https://taskmanager-cfr7.onrender.com/api',
});

// Add token to headers if available
API.interceptors.request.use((req) => {
    const token = sessionStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

// Register a user
export const register = (data) => API.post('/auth/register', data);

// Log in a user
export const login = (data) => API.post('/auth/login', data);

// Fetch tasks based on userId
export const fetchTasks = (userId) => API.get(`/tasks`);  // Send userId as query parameter

// Create a new task for a user
export const createTask = (data) => API.post('/tasks', data);  // Ensure userId is part of data when creating

// Update a task
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);

// Delete a task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// Fetch a single task by ID
export const fetchTask = (id) => API.get(`/tasks/${id}`); 
