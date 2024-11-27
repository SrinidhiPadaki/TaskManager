import React from 'react';
import { useDrag } from 'react-dnd';
import "../TaskCard.css";

const TaskCard = ({ task }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: task,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ background: '#fff', padding: 10, margin: 5, opacity: isDragging ? 0.5 : 1 }}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        </div>
    );
};

export default TaskCard;
