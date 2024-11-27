import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask } from '../api';
import TaskColumn from '../components/TaskColumn';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';  // Import Link to navigate
import '../Dashboard.css';  // Import Dashboard CSS

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const userId = sessionStorage.getItem('userId');  // Get userId from sessionStorage

    useEffect(() => {
        const loadTasks = async () => {
            if (!userId) {
                alert('User not authenticated');
                return;
            }
            try {
                const { data } = await fetchTasks(userId);  // Pass userId to fetch tasks for the user
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        loadTasks();
    }, [userId]);  // Re-run when userId changes

    const handleCreateTask = async () => {
        if (title.trim()) {
            if (!userId) {
                alert('User not authenticated');
                return;
            }

            const taskData = {
                title,
                description,
                status: 'To Do',
                userId,  // Attach the userId when creating the task
            };

            try {
                const { data } = await createTask(taskData);
                console.log("Task created successfully:", data);
                setTasks([...tasks, data]);  // Add the new task to the state
                setTitle('');
                setDescription('');
            } catch (error) {
                console.error("Error creating task:", error);
            }
        }
    };

    const handleDrop = async (task, newStatus) => {
        const updatedTask = { ...task, status: newStatus };
        try {
            await updateTask(task._id, updatedTask);
            setTasks((prev) => prev.map((t) => (t._id === task._id ? updatedTask : t)));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div>
            <Navbar/>
            <div style={{ display: 'flex', gap: 20 }}>
                {['To Do', 'In Progress', 'Done'].map((status) => (
                    <TaskColumn
                        key={status}
                        status={status}
                        tasks={tasks.filter((task) => task.status === status)}
                        onDrop={handleDrop}
                    />
                ))}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="New Task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={handleCreateTask}>Add Task</button>
            </div>

            <div>
                <h2>Task List</h2>
                {tasks.map((task) => (
                    <div key={task._id}>
                        <Link to={`/tasks/${task._id}`}>
                            <h3>{task.title}</h3>
                        </Link>
                        <p>{task.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
