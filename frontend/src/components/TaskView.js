import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTask, updateTask } from '../api';
import '../TaskView.css';  // Import TaskView CSS

const TaskView = () => {
    const { id } = useParams();  // Get the task ID from the URL
    const [task, setTask] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const navigate = useNavigate();

    // Fetch task details based on ID
    useEffect(() => {
        const loadTask = async () => {
            try {
                const { data } = await fetchTask(id); // Fetch task details by ID
                setTask(data);
                setTitle(data.title);
                setDescription(data.description);
                setStatus(data.status);
            } catch (error) {
                console.error("Error fetching task:", error);
            }
        };
        loadTask();
    }, [id]);

    // Handle task update
    const handleUpdate = async () => {
        const updatedTask = { title, description, status };
        try {
            await updateTask(id, updatedTask);  // Update the task
            navigate('/dashboard');  // Redirect to the dashboard after update
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    if (!task) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Task</h2>
            <div>
                <h3>Title</h3>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <h3>Description</h3>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <h3>Status</h3>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <button onClick={handleUpdate}>Update Task</button>
        </div>
    );
};

export default TaskView;
