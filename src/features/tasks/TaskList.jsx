// src/features/tasks/TaskList.jsx
import React, { useState } from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish React tutorial",
      description: "Learn component architecture",
      priority: "High",
    },
    {
      id: 2,
      title: "Read about Git best practices",
      description: "Understand commits and branches",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Plan project folder structure",
      description: "Setup components, features, pages",
      priority: "High",
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  // Function to remove a task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault(); // prevent page reload
    if (!newTask.title || !newTask.description) return;

    const taskToAdd = {
      id: Date.now(),
      ...newTask,
    };

    setTasks([...tasks, taskToAdd]);
    setNewTask({ title: "", description: "", priority: "Medium" });
  };

  return (
    <div className="task-list-container">
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          removeTask={removeTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;
