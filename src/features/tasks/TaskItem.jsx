// src/features/tasks/TaskItem.jsx
import React, { useState } from "react";
import "./TaskItem.css";

function TaskItem({ task, removeTask, toggleComplete }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);

    // Wait for animation to finish before actually removing from state
    setTimeout(() => {
      removeTask(task.id);
    }, 300); // Must match CSS animation duration
  };

  return (
    <div className={`task-card ${isRemoving ? "removing" : ""}`}>
      <div className="task-header">
        <h3 className={`task-title ${task.completed ? "completed" : ""}`}>
          {task.title}
        </h3>
        <span
          className={`priority-badge priority-${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-buttons">
        <button
          className={task.completed ? "undo-btn" : "complete-btn"}
          onClick={() => toggleComplete(task.id)}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        {/* <button className="delete-btn" onClick={() => removeTask(task.id)}>
          Remove Task
        </button> */}
        <button className="delete-btn" onClick={handleRemove}>
          Remove Task
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
