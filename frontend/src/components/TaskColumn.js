import React from 'react';
import TaskCard from './TaskCard';
import { useDrop } from 'react-dnd';
import "../TaskColumn.css";

const TaskColumn = ({ status, tasks, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TASK', // The type of draggable item this column can accept
        drop: (item) => onDrop(item, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                background: isOver ? '#e0f7fa' : '#f1f1f1',
                padding: 10,
                minHeight: 200,
            }}
        >
            <h3>{status}</h3>
            {tasks.map((task) => (
                <TaskCard key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskColumn;
