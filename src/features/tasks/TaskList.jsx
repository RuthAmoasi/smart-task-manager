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
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
  },
  {
    id: 2,
    title: "Read about Git best practices",
    description: "Understand commits and branches",
    priority: "Medium",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
  },
  {
    id: 3,
    title: "Plan project folder structure",
    description: "Setup components, features, pages",
    priority: "High",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
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

  const [sortOption, setSortOption] = useState("none"); // "priority", "deadline", or "none"

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
      deadline:
        newTask.deadline ||
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
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

  const sortTasks = (tasksArray) => {
    const sorted = [...tasksArray]; // copy so we don’t mutate original
    if (sortOption === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      sorted.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
      );
    } else if (sortOption === "deadline") {
      sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }
    return sorted;
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

        <input
          type="date"
          value={newTask.deadline || ""}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />

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

        <div className="sort-container">
          <label>Sort by: </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="none">None</option>
            <option value="priority">Priority</option>
            <option value="deadline">Deadline</option>
          </select>
        </div>

        <p className="task-count">
          {activeTaskCount} Active Task{activeTaskCount !== 1 ? "s" : ""}
        </p>

        <button className="clear-completed-btn" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>

      {sortTasks(filteredTasks).map((task) => (
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
