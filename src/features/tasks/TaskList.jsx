// src/features/tasks/TaskList.jsx
import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css";

const defaultTasks = [
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
];

function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : defaultTasks;
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
      completed: false,
    };

    setTasks([...tasks, taskToAdd]);
    setNewTask({ title: "", description: "", priority: "Medium" });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const activeTaskCount = tasks.filter((task) => !task.completed).length;

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
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

      <div className="task-controls">
        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "active" ? "active-filter" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={filter === "completed" ? "active-filter" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <p className="task-count">
          {activeTaskCount} Active Task{activeTaskCount !== 1 ? "s" : ""}
        </p>

        <button className="clear-completed-btn" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>

      {filteredTasks.map((task) => (
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
