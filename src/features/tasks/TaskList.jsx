// src/features/tasks/TaskList.jsx
import React from "react";
import TaskItem from "./TaskItem";

function TaskList() {
  const tasks = [
    { id: 1, title: "Finish React tutorial", description: "Learn component architecture", priority: "High" },
    { id: 2, title: "Read about Git best practices", description: "Understand commits and branches", priority: "Medium" },
    { id: 3, title: "Plan project folder structure", description: "Setup components, features, pages", priority: "High" },
  ];

  return (
    <div style={{ marginTop: "2rem" }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;