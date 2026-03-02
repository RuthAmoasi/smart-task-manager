// src/features/tasks/TaskList.jsx
import React, { useState } from "react";
import TaskItem from "./TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish React tutorial", description: "Learn component architecture", priority: "High" },
    { id: 2, title: "Read about Git best practices", description: "Understand commits and branches", priority: "Medium" },
    { id: 3, title: "Plan project folder structure", description: "Setup components, features, pages", priority: "High" },
  ]);

  // Function to remove a task
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} removeTask={removeTask} />
      ))}
    </div>
  );
}

export default TaskList;