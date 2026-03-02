// src/features/tasks/TaskItem.jsx
import React from "react";

function TaskItem({ task }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "0.5rem", borderRadius: "5px" }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>Priority: {task.priority}</small>
    </div>
  );
}

export default TaskItem;