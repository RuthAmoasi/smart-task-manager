// src/features/tasks/TaskItem.jsx
import React from "react";

function TaskItem({ task, removeTask, toggleComplete }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "0.5rem",
        borderRadius: "5px",
      }}
    >
      <h3
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          opacity: task.completed ? 0.6 : 1,
        }}
      >
        {task.title}
      </h3>
      <p>{task.description}</p>
      <small>Priority: {task.priority}</small>
      <br />
      <button
        onClick={() => toggleComplete(task.id)}
        style={{ marginTop: "0.5rem" }}
      >
        {task.completed ? "Undo" : "Complete"}
      </button>
      <button
        onClick={() => removeTask(task.id)}
        style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}
      >
        Remove Task
      </button>
    </div>
  );
}

export default TaskItem;
